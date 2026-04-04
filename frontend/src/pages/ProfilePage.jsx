import { useEffect, useState } from "react";

import { getOrders } from "../api/orders";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]));
  }, []);

  if (!user) {
    return <p className="text-herb-900/70">Please login to view profile.</p>;
  }

  return (
    <section className="space-y-5">
      <h1 className="section-heading">My Profile</h1>
      <div className="soft-card p-6">
        <p className="font-display text-2xl font-bold">{user.username}</p>
        <p className="text-herb-900/70">{user.email}</p>
      </div>
      <div className="space-y-3">
        <h2 className="font-display text-2xl font-bold text-herb-800">Order History</h2>
        {orders.length === 0 && <p className="text-sm text-herb-900/70">No orders yet.</p>}
        {orders.map((order) => (
          <article key={order.id} className="tone-card space-y-1 p-4">
            <p className="font-semibold text-herb-800">Order #{order.id}</p>
            <p className="text-sm text-herb-900/75">Status: {order.status}</p>
            <p className="text-sm text-herb-900/75">Total: Rs. {order.total}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
