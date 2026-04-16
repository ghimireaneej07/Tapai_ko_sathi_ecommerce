import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getOrders } from "../api/orders";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { buildProductImageTitle } from "../utils/productMedia";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("my-orders");

  const tabButtons = [
    { id: "my-orders", label: "My Orders" },
    { id: "history", label: "History" },
    { id: "wishlist", label: "Wishlist" },
  ];

  const normalizedOrders = useMemo(() => {
    return [...orders].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  }, [orders]);

  const myOrders = useMemo(() => {
    return normalizedOrders.filter((order) => !["delivered", "completed", "cancelled"].includes(String(order.status || "").toLowerCase()));
  }, [normalizedOrders]);

  const historyOrders = useMemo(() => {
    return normalizedOrders.filter((order) => ["delivered", "completed", "cancelled"].includes(String(order.status || "").toLowerCase()));
  }, [normalizedOrders]);

  const visibleOrders = activeTab === "history" ? historyOrders : myOrders;

  const totalSpent = useMemo(() => {
    return normalizedOrders.reduce((acc, order) => acc + Number(order.total || 0), 0);
  }, [normalizedOrders]);

  const rewardPoints = Math.floor(totalSpent / 10);
  const totalItemsPurchased = normalizedOrders.reduce(
    (acc, order) => acc + (Array.isArray(order.items) ? order.items.reduce((sum, item) => sum + Number(item.quantity || 0), 0) : 0),
    0,
  );
  const initials = String(user?.username || "U")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const getStatusClasses = (status) => {
    const value = String(status || "").toLowerCase();
    if (["delivered", "completed"].includes(value)) {
      return "bg-emerald-100 text-emerald-700";
    }
    if (["cancelled"].includes(value)) {
      return "bg-rose-100 text-rose-700";
    }
    if (["processing", "pending"].includes(value)) {
      return "bg-amber-100 text-amber-700";
    }
    return "bg-herb-100 text-herb-800";
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  useEffect(() => {
    getOrders()
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]));
  }, []);

  if (!user) {
    return <p className="text-herb-900/70">Please login to view profile.</p>;
  }

  return (
    <section className="mx-auto max-w-3xl space-y-7 pb-8 md:space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="section-heading">My Profile</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-herb-300/40 bg-white/80 px-4 py-2 text-sm font-semibold text-herb-800 transition duration-200 hover:bg-herb-100"
        >
          Logout
        </button>
      </div>

      <article className="soft-card overflow-hidden p-6 md:p-7">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="relative">
            <div className="h-28 w-28 rotate-3 rounded-[1.7rem] bg-herb-200 p-1.5 shadow-float">
              <div className="flex h-full w-full -rotate-3 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-herb-700 to-herb-600 text-3xl font-extrabold text-herb-50">
                {initials || "U"}
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 inline-flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-herb-700 text-xs font-bold text-herb-50">
              ✓
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-herb-900">{user.username}</h2>
            <p className="text-herb-900/70">{user.email}</p>
            <p className="text-sm italic text-herb-900/70">Building wellness habits with trusted herbal essentials.</p>
          </div>

          <div className="flex w-full gap-3">
            <button
              type="button"
              className="flex-1 rounded-xl bg-herb-700 py-3 text-sm font-bold text-herb-50 shadow-float transition duration-200 hover:bg-herb-600"
            >
              Edit Profile
            </button>
            <button
              type="button"
              className="rounded-xl border border-herb-300/40 bg-herb-100/80 px-4 py-3 text-sm font-semibold text-herb-800 transition duration-200 hover:bg-herb-100"
            >
              Share
            </button>
          </div>
        </div>
      </article>

      <section className="grid grid-cols-3 gap-3">
        <article className="rounded-[1.5rem_0.75rem_1.5rem_0.75rem] border border-herb-300/20 bg-white/90 p-4 text-center shadow-mist">
          <p className="text-2xl font-extrabold text-herb-800">{myOrders.length}</p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-herb-900/65">Active Orders</p>
        </article>
        <article className="rounded-[1.5rem_0.75rem_1.5rem_0.75rem] border border-herb-300/20 bg-herb-100/80 p-4 text-center shadow-mist">
          <p className="text-2xl font-extrabold text-herb-800">Rs. {totalSpent.toFixed(0)}</p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-herb-900/65">Total Spent</p>
        </article>
        <article className="rounded-[1.5rem_0.75rem_1.5rem_0.75rem] border border-herb-300/20 bg-white/90 p-4 text-center shadow-mist">
          <p className="text-2xl font-extrabold text-herb-700">{rewardPoints}</p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-herb-900/65">Reward Points</p>
        </article>
      </section>

      <section className="space-y-5">
        <div className="rounded-2xl bg-herb-100/70 p-1.5">
          <div className="grid grid-cols-3 gap-1.5">
            {tabButtons.map((tab) => {
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={
                    active
                      ? "rounded-xl bg-white px-2 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-herb-800 shadow-mist md:text-sm"
                      : "rounded-xl px-2 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-herb-900/65 transition duration-200 hover:bg-herb-100 md:text-sm"
                  }
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === "wishlist" && (
          <div className="soft-card space-y-3 p-5 text-sm text-herb-900/70">
            <p>
              You have {wishlistCount} saved {wishlistCount === 1 ? "item" : "items"} in your wishlist.
            </p>
            <Link
              to="/wishlist"
              className="inline-flex rounded-full border border-herb-300/40 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-herb-800 transition duration-200 hover:bg-herb-100"
            >
              Open Wishlist
            </Link>
          </div>
        )}

        {activeTab !== "wishlist" && (
          <div className="space-y-3">
            <h3 className="px-1 font-display text-xl font-bold text-herb-900">
              {activeTab === "my-orders" ? "Recent Activity" : "Order History"}
            </h3>

            {visibleOrders.length === 0 && (
              <p className="soft-card p-4 text-sm text-herb-900/70">
                {activeTab === "my-orders" ? "No active orders right now." : "No past orders available yet."}
              </p>
            )}

            {visibleOrders.map((order) => {
              const firstItem = order.items?.[0];
              const firstItemLabel = firstItem ? buildProductImageTitle({ name: firstItem.product_name }) : "Order Items";

              return (
                <article key={order.id} className="rounded-[1.5rem_0.75rem_1.5rem_0.75rem] border border-herb-300/20 bg-white/95 p-5 shadow-mist">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-display text-lg font-bold text-herb-900">{firstItemLabel}</p>
                      <p className="text-xs font-medium text-herb-900/65">Order #{order.id}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${getStatusClasses(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-2 border-t border-herb-300/20 pt-3">
                    {Array.isArray(order.items) && order.items.length > 0 && (
                      <ul className="space-y-1.5">
                        {order.items.map((item) => (
                          <li key={item.id} className="flex items-center justify-between gap-3 text-sm text-herb-900/80">
                            <span>{buildProductImageTitle({ name: item.product_name })}</span>
                            <span>x{item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="text-sm font-semibold text-herb-800">Total: Rs. {Number(order.total || 0).toFixed(2)}</p>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="flex justify-center pb-2">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-red-300/60 bg-red-50 px-6 py-2 text-sm font-semibold text-red-600 transition duration-200 hover:bg-red-100"
          >
            Logout Account
          </button>
        </div>
      </section>
    </section>
  );
}
