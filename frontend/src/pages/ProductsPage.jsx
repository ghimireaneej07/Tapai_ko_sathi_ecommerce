import { useCallback, useEffect, useMemo, useState } from "react";

import { addToCart } from "../api/cart";
import { getCategories, getProducts } from "../api/store";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";
import { buildProductDisplayDescription, buildProductImageTitle } from "../utils/productMedia";

export default function ProductsPage() {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadError, setLoadError] = useState("");

  const loadProducts = useCallback(async () => {
    try {
      const { data } = await getProducts();
      setAllProducts(data);
      setLoadError("");
    } catch (error) {
      setAllProducts([]);
      setLoadError(error?.userMessage || "Products are unavailable right now. Please start backend services.");
    }
  }, []);

  useEffect(() => {
    loadProducts();
    getCategories()
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, [loadProducts]);

  const onSearch = (e) => {
    e.preventDefault();
    setActiveQuery(query.trim());
  };

  const applyCategory = (categorySlug) => {
    const nextCategory = activeCategory === categorySlug ? "" : categorySlug;
    setActiveCategory(nextCategory);
  };

  const clearFilters = () => {
    setQuery("");
    setActiveQuery("");
    setActiveCategory("");
    loadProducts();
  };

  const handleAdd = async (productId) => {
    try {
      await addToCart(productId, 1);
      alert("Added to cart");
    } catch {
      alert("Please login first.");
    }
  };

  const handleWishlistToggle = (product) => {
    const saved = toggleWishlist(product);
    alert(saved ? "Saved to wishlist" : "Removed from wishlist");
  };

  const filteredProducts = useMemo(() => {
    const normalizedQuery = activeQuery.toLowerCase();

    return allProducts.filter((product) => {
      const categoryName = product.category?.name || "";
      const categorySlug = product.category?.slug || "";
      const displayTitle = buildProductImageTitle(product);
      const displayDescription = buildProductDisplayDescription(product);
      const searchSource = [product.name, displayTitle, displayDescription, product.slug, product.description, categoryName, categorySlug]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesQuery = !normalizedQuery || searchSource.includes(normalizedQuery);
      const matchesCategory = !activeCategory || categorySlug === activeCategory || categoryName.toLowerCase() === activeCategory.toLowerCase();

      return matchesQuery && matchesCategory;
    });
  }, [allProducts, activeCategory, activeQuery]);

  const visibleCategories = useMemo(
    () => categories.filter((category) => category.slug !== "powders"),
    [categories],
  );

  return (
    <section className="space-y-8 md:space-y-10">
      <div>
        <h1 className="section-heading">Product Listing</h1>
        <p className="mt-2 section-subtitle">Natural & Ayurvedic filters inspired by the Stitch product discovery flow.</p>
      </div>

      <div className="space-y-4">
        <form onSubmit={onSearch} className="tone-card flex flex-col gap-3 p-5 md:flex-row md:items-center">
          <input
            value={query}
            onChange={(e) => {
              const nextValue = e.target.value;
              setQuery(nextValue);
              setActiveQuery(nextValue.trim());
            }}
            placeholder="Search herbal products..."
            className="input-shell rounded-full"
          />
          <div className="flex gap-2 md:shrink-0">
            <button className="pill-btn px-6">Search</button>
            <button type="button" onClick={clearFilters} className="ghost-btn px-5">
              Clear
            </button>
          </div>
        </form>

        {visibleCategories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {visibleCategories.map((category) => {
              const isActive = activeCategory === category.slug;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => applyCategory(category.slug)}
                  className={isActive ? "pill-btn px-4 py-2 text-sm" : "ghost-btn px-4 py-2 text-sm"}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white/55 p-4 shadow-mist backdrop-blur-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-herb-700">Results</p>
            <p className="text-sm text-herb-900/70">
              {activeQuery || activeCategory
                ? `Showing filtered products${activeQuery ? ` for “${activeQuery}”` : ""}${activeCategory ? ` in ${categories.find((item) => item.slug === activeCategory)?.name || activeCategory}` : ""}`
                : "Showing all active products"}
            </p>
          </div>
          <button type="button" onClick={clearFilters} className="ghost-btn px-4 py-2 text-sm">
            Reset filters
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAdd}
              onToggleWishlist={handleWishlistToggle}
              isWishlisted={isInWishlist(product)}
            />
          ))}
        </div>
      </div>

      {loadError && <p className="text-sm text-herb-900/75">{loadError}</p>}
      {!loadError && filteredProducts.length === 0 && <p className="text-sm text-herb-900/70">No products found for your filter.</p>}
    </section>
  );
}
