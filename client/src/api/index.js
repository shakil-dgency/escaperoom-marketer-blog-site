import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const logIn = (formData) => API.post("/apiuser/signin", formData);
export const createPost = (newPost) => API.post("/apiposts", newPost);
export const fetchPosts = () => API.get("/apiposts");
export const updatePost = (id, updatedPost) => API.patch(`/apiposts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/apiposts/${id}`);
