export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;
  readonly requestId?: string;

  constructor(
    status: number,
    message: string,
    body?: unknown,
    requestId?: string | null,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
    this.requestId = requestId ?? undefined;
  }
}
