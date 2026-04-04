import client from "./client";

export const getFeaturedProducts = () => client.get("/store/products/?featured=true");
export const getProducts = (query = "") => client.get(`/store/products/${query ? `?q=${encodeURIComponent(query)}` : ""}`);
export const getProductById = (id) => client.get(`/store/products/${id}/`);
export const getCategories = () => client.get("/store/categories/");
