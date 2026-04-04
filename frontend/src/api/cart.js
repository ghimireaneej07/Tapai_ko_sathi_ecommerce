import client from "./client";

export const getCart = () => client.get("/store/cart/");
export const addToCart = (product_id, quantity = 1) => client.post("/store/cart/items/", { product_id, quantity });
export const updateCartItem = (itemId, quantity) => client.patch(`/store/cart/items/${itemId}/`, { quantity });
export const removeCartItem = (itemId) => client.delete(`/store/cart/items/${itemId}/`);
