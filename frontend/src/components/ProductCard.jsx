import { memo } from "react";
import { Link } from "react-router-dom";

import fallbackProductImage from "../../media/products/raw_himalayan_forest_honey.png";

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="soft-card overflow-hidden transition duration-200 hover:bg-herb-50">
      <img
        src={product.image_url || fallbackProductImage}
        alt={product.name}
        loading="lazy"
        decoding="async"
        className="h-44 w-full object-cover"
      />
      <div className="space-y-3 p-5">
        <h3 className="font-display text-xl font-bold leading-tight">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-herb-900/70">{product.description || "High-quality natural wellness product."}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-herb-800">Rs. {product.price}</span>
          <div className="flex gap-2">
            <Link to={`/products/${product.id}`} className="rounded-full border border-herb-300/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-herb-800 transition duration-200 hover:bg-herb-100">
              View
            </Link>
            <button
              onClick={() => onAddToCart?.(product.id)}
              className="rounded-full bg-herb-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-herb-50 transition duration-200 hover:bg-herb-600"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
