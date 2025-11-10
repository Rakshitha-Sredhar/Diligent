import axios from 'axios';

// Prefer explicit API base URL from environment; fall back to dev proxy (/api)
const API_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export function setSessionHeader(sessionId) {
  if (sessionId) {
    api.defaults.headers.common['x-session-id'] = sessionId;
  } else {
    delete api.defaults.headers.common['x-session-id'];
  }
}

export default api;

