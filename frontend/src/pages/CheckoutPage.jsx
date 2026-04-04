import { useState } from "react";

import { checkout } from "../api/orders";

export default function CheckoutPage() {
  const [form, setForm] = useState({ full_name: "", email: "", address: "", phone: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await checkout(form);
      alert("Order placed successfully");
      setForm({ full_name: "", email: "", address: "", phone: "" });
    } catch {
      alert("Please ensure you are logged in and cart has items.");
    }
  };

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <h1 className="section-heading">Secure Checkout</h1>
      <form onSubmit={onSubmit} className="soft-card grid gap-3 p-6">
        <input name="full_name" placeholder="Full name" value={form.full_name} onChange={onChange} className="input-shell" />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} className="input-shell" />
        <textarea name="address" placeholder="Delivery address" value={form.address} onChange={onChange} className="input-shell min-h-28 resize-y" />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} className="input-shell" />
        <button className="pill-btn w-full">Place Order</button>
      </form>
    </section>
  );
}
