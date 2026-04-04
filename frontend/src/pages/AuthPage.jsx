import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import authImage from "../../media/login_signup_image.png";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        await login(form.username, form.password);
      } else {
        await register(form);
      }
      navigate("/");
    } catch {
      alert("Authentication failed");
    }
  };

  return (
    <section className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
      <div className="soft-card order-2 grid gap-3 p-6 lg:order-1">
        <h1 className="section-heading text-3xl md:text-4xl">Login / Sign Up</h1>
        <p className="section-subtitle">Access your orders, saved items, and herbal wellness picks.</p>
        <form onSubmit={onSubmit} className="grid gap-3">
          <input name="username" placeholder="Username" value={form.username} onChange={onChange} className="input-shell" />
          {mode === "register" && (
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} className="input-shell" />
          )}
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} className="input-shell" />
          <button className="pill-btn w-full">
            {mode === "login" ? "Login" : "Create account"}
          </button>
        </form>
        <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="w-fit text-sm font-semibold text-herb-700 hover:text-herb-600">
          {mode === "login" ? "Need an account? Sign up" : "Have an account? Login"}
        </button>
      </div>
      <div className="order-1 overflow-hidden rounded-3xl bg-herb-100 lg:order-2">
        <img src={authImage} alt="Login and sign up" loading="lazy" decoding="async" className="h-full min-h-72 w-full object-cover" />
      </div>
    </section>
  );
}
