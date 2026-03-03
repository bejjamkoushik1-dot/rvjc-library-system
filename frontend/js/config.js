// Configuration for API endpoints
// Update this with your Railway backend URL
const API_BASE_URL = 'https://your-railway-app-url.railway.app';

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { API_BASE_URL };
} else {
  window.API_BASE_URL = API_BASE_URL;
}
