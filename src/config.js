// config.js
const isProduction = process.env.API_URL === 'production';

export const API_URL = isProduction 
    ? 'https://my-flix-movies-0d84af3d4373.herokuapp.com/'
    : 'http://localhost:8080';