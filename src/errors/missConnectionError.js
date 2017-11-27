class MissConnectionError extends Error {
  static message = "DB connection doesn't exist yet. Call 'connection()' before use one.";
  constructor() {
    super(MissConnectionError.message);

    this.name = MissConnectionError.name;

    Error.captureStackTrace(this, MissConnectionError);
  }
}

export default MissConnectionError;
