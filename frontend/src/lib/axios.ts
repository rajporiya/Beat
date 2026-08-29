import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "http://localhost:1234/api",
    // Clerk's session cookies must be included when the API is on a different
    // localhost port from the Vite application.
    withCredentials: true,
})
