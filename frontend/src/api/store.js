import client from "./client";

export const getFeaturedProducts = () => client.get("/store/products/?featured=true");
export const getProducts = ({ query = "", category = "" } = {}) => {
	const params = new URLSearchParams();

	if (query) {
		params.set("q", query);
	}

	if (category) {
		params.set("category", category);
	}

	const queryString = params.toString();
	return client.get(`/store/products/${queryString ? `?${queryString}` : ""}`);
};
export const getProductById = (id) => client.get(`/store/products/${id}/`);
export const getCategories = () => client.get("/store/categories/");
