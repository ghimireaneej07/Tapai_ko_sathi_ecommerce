import { Link } from "react-router-dom";

import { addToCart } from "../api/cart";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, wishlistCount, clearWishlist } = useWishlist();

  const handleAdd = async (productId) => {
    try {
      await addToCart(productId, 1);
      alert("Added to cart");
    } catch {
      alert("Please login first.");
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <section className="space-y-6">
        <div>
          <h1 className="section-heading">My Wishlist</h1>
          <p className="mt-2 section-subtitle">Save favorite products to compare, revisit, and buy later.</p>
        </div>

        <article className="soft-card space-y-4 p-6">
          <p className="text-herb-900/70">You have no saved products yet.</p>
          <Link to="/products" className="pill-btn inline-flex w-fit items-center justify-center px-5 py-2.5">
            Browse Categories
          </Link>
        </article>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="section-heading">My Wishlist</h1>
          <p className="mt-2 section-subtitle">{wishlistCount} saved {wishlistCount === 1 ? "item" : "items"} ready when you are.</p>
        </div>
        <button
          type="button"
          onClick={clearWishlist}
          className="rounded-full border border-herb-300/40 bg-white/80 px-4 py-2 text-sm font-semibold text-herb-800 transition duration-200 hover:bg-herb-100"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {wishlistItems.map((product) => (
          <ProductCard
            key={product.key}
            product={product}
            onAddToCart={handleAdd}
            onToggleWishlist={removeFromWishlist}
            isWishlisted
          />
        ))}
      </div>
    </section>
  );
}
