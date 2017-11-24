class AppError extends Error {
  constructor(message, status) {
    super(message);

    this.name = AppError.name;

    Error.captureStackTrace(this, AppError);

    this.status = status || 500;
  }
}

export default AppError;
