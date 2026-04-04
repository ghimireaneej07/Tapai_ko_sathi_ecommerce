import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { addToCart } from "../api/cart";
import { getProductById } from "../api/store";
import fallbackProductImage from "../../media/products/raw_himalayan_forest_honey.png";

export default function ProductDetailPage() {
  const { id } = useParams();
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

  if (!product) {
    return <p className="text-herb-900/70">Loading product...</p>;
  }

  return (
    <section className="soft-card grid gap-8 overflow-hidden p-5 md:grid-cols-2 md:p-8">
      <img
        src={product.image_url || fallbackProductImage}
        alt={product.name}
        className="h-96 w-full rounded-3xl object-cover"
      />
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-herb-700">Updated Product Detail - Herbal focus</p>
        <h1 className="section-heading text-3xl md:text-4xl">{product.name}</h1>
        <p className="section-subtitle">{product.description || "Pure botanical wellness support from trusted local sourcing."}</p>
        <div className="tone-card space-y-2 p-4">
          <p className="text-sm text-herb-900/70">Price</p>
          <p className="text-3xl font-bold text-herb-700">Rs. {product.price}</p>
          <p className="text-sm text-herb-900/70">In stock: {product.stock}</p>
        </div>
        <button onClick={handleAdd} className="pill-btn w-full md:w-auto">
          Add to Cart
        </button>
      </div>
    </section>
  );
}
