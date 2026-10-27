const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() ?? "";

/**
 * Optional backend origin or API prefix, supplied at build time.
 * Leave empty until the backend host/prefix has been agreed.
 */
export const API_BASE_URL = configuredBaseUrl.replace(/\/+$/, "");
