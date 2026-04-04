import client from "./client";

export const checkout = (payload) => client.post("/orders/checkout/", payload);
export const getOrders = () => client.get("/orders/");
