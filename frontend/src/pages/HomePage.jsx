import { useCallback, useEffect, useState } from "react";

import { addToCart } from "../api/cart";
import { getFeaturedProducts } from "../api/store";
import ProductCard from "../components/ProductCard";
import categoryAyurvedicImage from "../../media/catagory_ayurvedic_medicines,png.avif";
import categoryRawHerbsImage from "../../media/catagory_raw_herbs.jpeg";
import heroImage from "../../media/hero_local_herbal_products.png";
import rareProductsImage from "../../media/staff_fav_section/wild_himalayan_honey.png";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getFeaturedProducts()
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]));
  }, []);

  const handleAdd = useCallback(async (productId) => {
    try {
      await addToCart(productId, 1);
      alert("Added to cart");
    } catch {
      alert("Please login first.");
    }
  }, []);

  return (
    <section className="space-y-12 md:space-y-14">
      <div className="grid items-center gap-8 rounded-[2rem] bg-gradient-to-br from-herb-700 to-herb-600 px-6 py-8 text-herb-50 shadow-float md:grid-cols-2 md:px-12 md:py-14">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.24em]">Nepal's Local Choice</p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] md:text-6xl">
            Your natural companion for ayurvedic wellness
          </h1>
          <p className="mt-5 max-w-xl text-lg text-herb-50/90">
            100% Natural & Ayurvedic Products. Sourced from Nature, Trusted for Health. Bringing the ancient wisdom of
            forest-sourced remedies directly to your doorstep.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button className="ghost-btn bg-herb-50 px-6 text-herb-800 hover:bg-herb-50">Shop Collections</button>
            <button className="rounded-full border border-herb-50/60 px-6 py-2.5 font-semibold text-herb-50 transition duration-200 hover:bg-herb-50/10">Our Story</button>
          </div>
        </div>
        <img
          src={heroImage}
          alt="Local herbal products"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-72 w-full rounded-3xl object-cover md:h-[26rem]"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="tone-card p-6">
          <p className="font-display text-xl font-bold">Reliable Delivery</p>
          <p className="mt-2 text-sm text-herb-900/70">Timely and secure shipping across the valley.</p>
        </article>
        <article className="tone-card p-6">
          <p className="font-display text-xl font-bold">Community Support</p>
          <p className="mt-2 text-sm text-herb-900/70">Empowering local artisans and farmers directly.</p>
        </article>
        <article className="tone-card p-6">
          <p className="font-display text-xl font-bold">Quality Checked</p>
          <p className="mt-2 text-sm text-herb-900/70">Every product meets our high standards of purity.</p>
        </article>
      </div>

      <div className="space-y-4">
        <p className="font-display text-3xl font-bold text-herb-800 md:text-4xl">Join our Natural Wellness Circle</p>
        <p className="max-w-3xl section-subtitle">Discover the healing power of Nepal's pristine wilderness.</p>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="soft-card overflow-hidden">
            <img
              src={categoryRawHerbsImage}
              alt="Raw herbs"
              loading="lazy"
              decoding="async"
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <p className="font-display text-xl font-bold">Raw Herbs</p>
              <p className="mt-2 text-sm text-herb-900/70">Unprocessed, wild-harvested botanicals for traditional preparation.</p>
            </div>
          </article>
          <article className="soft-card overflow-hidden">
            <img
              src={categoryAyurvedicImage}
              alt="Ayurvedic medicine"
              loading="lazy"
              decoding="async"
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <p className="font-display text-xl font-bold">Ayurvedic Medicine</p>
              <p className="mt-2 text-sm text-herb-900/70">Carefully formulated remedies rooted in time-tested wellness science.</p>
            </div>
          </article>
          <article className="soft-card overflow-hidden">
            <img
              src={rareProductsImage}
              alt="Rare products"
              loading="lazy"
              decoding="async"
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <p className="font-display text-xl font-bold">Rare Products</p>
              <p className="mt-2 text-sm text-herb-900/70">Hard-to-find forest treasures and high-altitude medicinal compounds.</p>
            </div>
          </article>
        </div>
      </div>

      <div className="space-y-4">
        <p className="font-display text-3xl font-bold text-herb-800">Staff Favorites</p>
        <p className="text-herb-900/70">The most loved items from our local community this week.</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAdd} />
          ))}
        </div>
      </div>

      <div className="tone-card flex flex-col items-start gap-4 p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-2xl font-bold">Join our Natural Wellness Circle</p>
          <p className="mt-2 text-sm text-herb-900/70">
            Receive curated insights on Ayurvedic living and early access to our rarest forest harvests.
          </p>
        </div>
        <button className="pill-btn">Join Now</button>
      </div>
    </section>
  );
}
