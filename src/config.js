// config.js
const isProduction = process.env.NODE_ENV === 'production';

export const API_URL = isProduction 
    ? 'https://your-live-api-url.herokuapp.com'
    : 'http://localhost:8080';