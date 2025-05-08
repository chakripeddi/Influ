export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: any;

  constructor(
    message: string,
    details?: any,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;

    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;

    // This is needed to make the instanceof operator work correctly
    Object.setPrototypeOf(this, new.target.prototype);

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  public static isAppError(error: any): error is AppError {
    return error instanceof AppError;
  }

  public static handleError(error: any): AppError {
    if (AppError.isAppError(error)) {
      return error;
    }

    // Handle Supabase errors
    if (error?.code) {
      switch (error.code) {
        case '23505': // Unique violation
          return new AppError('Resource already exists', error, 409);
        case '23503': // Foreign key violation
          return new AppError('Referenced resource does not exist', error, 400);
        case '42P01': // Undefined table
          return new AppError('Database table does not exist', error, 500);
        case '42703': // Undefined column
          return new AppError('Invalid field specified', error, 400);
        default:
          return new AppError('Database error occurred', error, 500);
      }
    }

    // Handle network errors
    if (error?.name === 'NetworkError') {
      return new AppError('Network error occurred', error, 503);
    }

    // Handle validation errors
    if (error?.name === 'ValidationError') {
      return new AppError('Validation error', error, 400);
    }

    // Handle authentication errors
    if (error?.name === 'AuthError') {
      return new AppError('Authentication error', error, 401);
    }

    // Handle authorization errors
    if (error?.name === 'AuthorizationError') {
      return new AppError('Authorization error', error, 403);
    }

    // Default error
    return new AppError('An unexpected error occurred', error, 500);
  }
}

// Custom error types
export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, details, 400);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required', details?: any) {
    super(message, details, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions', details?: any) {
    super(message, details, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found', details?: any) {
    super(message, details, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict', details?: any) {
    super(message, details, 409);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded', details?: any) {
    super(message, details, 429);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database error', details?: any) {
    super(message, details, 500);
  }
}

export class ExternalServiceError extends AppError {
  constructor(message: string = 'External service error', details?: any) {
    super(message, details, 502);
  }
} 