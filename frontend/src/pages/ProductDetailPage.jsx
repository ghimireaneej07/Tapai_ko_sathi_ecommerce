import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { addToCart } from "../api/cart";
import { getProductById } from "../api/store";
import { useWishlist } from "../context/WishlistContext";
import { buildProductDisplayDescription, buildProductImageAlt, buildProductImageTitle, resolveProductImage } from "../utils/productMedia";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then((res) => setProduct(res.data));
  }, [id]);

  const handleAdd = async () => {
    try {
      await addToCart(product.id, 1);
      alert("Added to cart");
    } catch {
      alert("Please login first.");
    }
  };

  const handleWishlistToggle = () => {
    const saved = toggleWishlist(product);
    alert(saved ? "Saved to wishlist" : "Removed from wishlist");
  };

  if (!product) {
    return <p className="text-herb-900/70">Loading product...</p>;
  }

  const imageSrc = resolveProductImage(product);
  const imageAlt = buildProductImageAlt(product);
  const imageTitle = buildProductImageTitle(product);
  const displayDescription = buildProductDisplayDescription(product);

  return (
    <section className="soft-card grid gap-8 overflow-hidden p-5 md:grid-cols-2 md:p-8">
      <img
        src={imageSrc}
        alt={imageAlt}
        title={imageTitle}
        loading="lazy"
        decoding="async"
        className="h-96 w-full rounded-3xl object-cover"
      />
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-herb-700">Updated Product Detail - Herbal focus</p>
        <h1 className="section-heading text-3xl md:text-4xl">{imageTitle}</h1>
        <p className="section-subtitle">{displayDescription}</p>
        <div className="tone-card space-y-2 p-4">
          <p className="text-sm text-herb-900/70">Price</p>
          <p className="text-3xl font-bold text-herb-700">Rs. {product.price}</p>
          <p className="text-sm text-herb-900/70">In stock: {product.stock}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button onClick={handleAdd} className="pill-btn w-full md:w-auto">
            Add to Cart
          </button>
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={isInWishlist(product)
              ? "w-full rounded-full border border-herb-300/40 bg-herb-100 px-5 py-3 text-sm font-semibold text-herb-800 transition duration-200 hover:bg-herb-200 md:w-auto"
              : "w-full rounded-full border border-herb-300/40 bg-white px-5 py-3 text-sm font-semibold text-herb-800 transition duration-200 hover:bg-herb-100 md:w-auto"}
          >
            {isInWishlist(product) ? "Saved in Wishlist" : "Save to Wishlist"}
          </button>
        </div>
      </div>
    </section>
  );
}
