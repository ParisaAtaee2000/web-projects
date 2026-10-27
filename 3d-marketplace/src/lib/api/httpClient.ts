import { API_BASE_URL } from "./config";
import { ApiError } from "./ApiError";

export type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | readonly (string | number | boolean | null | undefined)[];

export type QueryParams = Record<string, QueryValue>;

export interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  /** Request body; plain objects and arrays are JSON-encoded automatically. */
  body?: unknown;
  /** Values that should be added to the URL as query parameters. */
  query?: QueryParams;
}

function isNativeBody(value: unknown): boolean {
  if (typeof value === "string") return true;
  if (typeof FormData !== "undefined" && value instanceof FormData) return true;
  if (typeof Blob !== "undefined" && value instanceof Blob) return true;
  if (typeof URLSearchParams !== "undefined" && value instanceof URLSearchParams) return true;
  if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) return true;
  return typeof ReadableStream !== "undefined" && value instanceof ReadableStream;
}

function buildUrl(path: string, query?: QueryParams): URL {
  if (!path.trim()) {
    throw new Error("API request path must not be empty.");
  }

  const normalizedPath = path.startsWith("/") ? path : "/" + path;
  const url = new URL(
    API_BASE_URL + normalizedPath,
    window.location.origin,
  );

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === null || value === undefined) continue;

      if (Array.isArray(value)) {
        for (const item of value) {
          if (item !== null && item !== undefined) {
            url.searchParams.append(key, String(item));
          }
        }
      } else {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url;
}

async function readResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204 || response.status === 205) return undefined;

  const text = await response.text();
  if (!text) return undefined;

  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (contentType.includes("json")) {
    try {
      return JSON.parse(text) as unknown;
    } catch {
      return text;
    }
  }

  return text;
}

function getErrorMessage(body: unknown, fallback: string): string {
  if (typeof body !== "object" || body === null) return fallback;

  const record = body as Record<string, unknown>;
  for (const key of ["message", "detail", "title"]) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value;
  }

  return fallback;
}

/**
 * Shared fetch wrapper. It intentionally does not define endpoint paths,
 * authentication policy, or backend response DTOs; those are agreed separately.
 */
export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { query, body, headers: inputHeaders, ...requestOptions } = options;
  const headers = new Headers(inputHeaders);
  headers.set("Accept", headers.get("Accept") ?? "application/json");

  let requestBody: BodyInit | undefined;
  if (body !== undefined) {
    if (isNativeBody(body)) {
      requestBody = body as BodyInit;
    } else {
      requestBody = JSON.stringify(body);
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
    }
  }

  const response = await fetch(buildUrl(path, query), {
    ...requestOptions,
    headers,
    body: requestBody,
  });

  const responseBody = await readResponseBody(response);

  if (!response.ok) {
    throw new ApiError(
      response.status,
      getErrorMessage(
        responseBody,
        response.statusText || "در ارتباط با سرور خطایی رخ داد.",
      ),
      responseBody,
      response.headers.get("x-request-id"),
    );
  }

  return responseBody as T;
}

export { ApiError } from "./ApiError";
