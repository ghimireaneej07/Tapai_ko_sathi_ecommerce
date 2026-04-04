import client from "./client";

export const registerUser = (payload) => client.post("/auth/register/", payload);
export const loginUser = (payload) => client.post("/auth/token/", payload);
export const getMe = () => client.get("/auth/me/");
