// Centralized backend configuration
// All API and WebSocket URLs are defined here.
// Values are read from environment variables (VITE_*) at build time.
// Fallbacks point to the deployed Render backend.

export const API_URL =
  import.meta.env.VITE_API_URL || 'https://cybershield-ai-gr6l.onrender.com';

export const WS_URL =
  import.meta.env.VITE_WS_URL || 'wss://cybershield-ai-gr6l.onrender.com/ws/live';
