import { useCallback, useEffect, useState } from "react";

import { addToCart } from "../api/cart";
import { getCategories, getProducts } from "../api/store";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadError, setLoadError] = useState("");

  const loadProducts = useCallback(async (search = "") => {
    try {
      const { data } = await getProducts(search);
      setProducts(data);
      setLoadError("");
    } catch (error) {
      setProducts([]);
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
    loadProducts(query);
  };

  const handleAdd = async (productId) => {
    try {
      await addToCart(productId, 1);
      alert("Added to cart");
    } catch {
      alert("Please login first.");
    }
  };

  return (
    <section className="space-y-8 md:space-y-10">
      <div>
        <h1 className="section-heading">Product Listing</h1>
        <p className="mt-2 section-subtitle">Natural & Ayurvedic filters inspired by the Stitch product discovery flow.</p>
      </div>

      <form onSubmit={onSearch} className="tone-card flex flex-col gap-3 p-5 md:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search herbal products..."
          className="input-shell rounded-full"
        />
        <button className="pill-btn">Search</button>
      </form>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => loadProducts(category.name)}
              className="ghost-btn px-4 py-2 text-sm"
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAdd} />
        ))}
      </div>
      {loadError && <p className="text-sm text-herb-900/75">{loadError}</p>}
      {!loadError && products.length === 0 && <p className="text-sm text-herb-900/70">No products found for your filter.</p>}
    </section>
  );
}
