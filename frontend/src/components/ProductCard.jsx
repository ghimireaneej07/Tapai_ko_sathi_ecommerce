import { memo } from "react";
import { Link } from "react-router-dom";

import { buildProductDisplayDescription, buildProductImageAlt, buildProductImageTitle, resolveProductImage } from "../utils/productMedia";

function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted = false }) {
  const imageSrc = resolveProductImage(product);
  const imageAlt = buildProductImageAlt(product);
  const imageTitle = buildProductImageTitle(product);
  const displayDescription = buildProductDisplayDescription(product);

  return (
    <article className="soft-card flex h-full flex-col overflow-hidden transition duration-200 hover:-translate-y-0.5 hover:bg-herb-50/70">
      <img
        src={imageSrc}
        alt={imageAlt}
        title={imageTitle}
        loading="lazy"
        decoding="async"
        className="h-44 w-full object-cover md:h-48"
      />
      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-herb-900 md:text-2xl">{imageTitle}</h3>
        <p className="line-clamp-2 min-h-10 text-sm leading-relaxed text-herb-900/72 md:text-[0.98rem]">
          {displayDescription}
        </p>
        <div className="mt-auto flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-2xl font-extrabold leading-none text-herb-800 md:text-[1.9rem]">Rs. {product.price}</span>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            <Link to={`/products/${product.id}`} className="rounded-full border border-herb-300/40 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-herb-800 transition duration-200 hover:bg-herb-100">
              View
            </Link>
            <button
              type="button"
              onClick={() => onToggleWishlist?.(product)}
              className={isWishlisted
                ? "rounded-full border border-herb-300/40 bg-herb-100 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-herb-800 transition duration-200 hover:bg-herb-200"
                : "rounded-full border border-herb-300/40 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-herb-800 transition duration-200 hover:bg-herb-100"}
            >
              {isWishlisted ? "Saved" : "Save"}
            </button>
            <button
              onClick={() => onAddToCart?.(product.id)}
              className="rounded-full bg-herb-700 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-herb-50 transition duration-200 hover:bg-herb-600"
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
