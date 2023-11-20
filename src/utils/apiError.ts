class ApiError extends Error {
  statusCode: number;
  status: String;

  constructor(massage: any, statusCode: number) {
    super(massage);
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(msg: any) {
    return new ApiError(msg, 400);
  }

  static notFound(msg: any) {
    return new ApiError(msg, 404);
  }

  static internalError(msg: any) {
    return new ApiError(msg, 500);
  }
}

export default ApiError;
