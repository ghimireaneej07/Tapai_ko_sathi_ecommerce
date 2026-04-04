import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getCart, removeCartItem, updateCartItem } from "../api/cart";

export default function CartPage() {
  const [cart, setCart] = useState(null);

  const loadCart = async () => {
    try {
      const { data } = await getCart();
      setCart(data);
    } catch {
      setCart({ items: [], total: 0 });
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQty = async (itemId, qty) => {
    const { data } = await updateCartItem(itemId, qty);
    setCart(data);
  };

  const removeItem = async (itemId) => {
    const { data } = await removeCartItem(itemId);
    setCart(data);
  };

  if (!cart) return <p className="text-herb-900/70">Loading cart...</p>;

  return (
    <section className="space-y-6">
      <h1 className="section-heading">Your Cart</h1>
      <div className="space-y-3">
        {cart.items?.map((item) => (
          <article key={item.id} className="soft-card flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-xl font-bold">{item.product.name}</h2>
              <p className="text-herb-900/70">Rs. {item.product.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQty(item.id, Number(e.target.value))}
                className="input-shell w-20 rounded-full px-3 py-1.5"
              />
              <button onClick={() => removeItem(item.id)} className="rounded-full bg-red-500 px-3 py-1.5 text-sm font-semibold text-white transition duration-200 hover:bg-red-600">
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="tone-card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xl font-bold">Total: Rs. {cart.total}</p>
        <Link to="/checkout" className="pill-btn">
          Proceed to Checkout
        </Link>
      </div>
    </section>
  );
}
