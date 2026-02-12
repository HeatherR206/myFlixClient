const isLocal = window.location.hostname === "localhost";

export const API_URL = isLocal ? "http://localhost:8080" : "https://my-flix-movies-0d84af3d4373.herokuapp.com";
