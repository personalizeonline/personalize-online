/**
 * Production-safe logging utility
 * Prevents sensitive data leakage in production
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  [key: string]: any;
}

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * Safe logger that sanitizes sensitive data
 */
class Logger {
  private sanitize(data: any): any {
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    const sensitiveKeys = [
      'password',
      'secret',
      'token',
      'key',
      'authorization',
      'cookie',
      'session',
      'razorpay_signature',
      'key_secret',
    ];

    const sanitized = { ...data };

    for (const key of Object.keys(sanitized)) {
      const lowerKey = key.toLowerCase();
      if (sensitiveKeys.some(sensitive => lowerKey.includes(sensitive))) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof sanitized[key] === 'object') {
        sanitized[key] = this.sanitize(sanitized[key]);
      }
    }

    return sanitized;
  }

  private log(level: LogLevel, message: string, context?: LogContext) {
    const timestamp = new Date().toISOString();
    const sanitizedContext = context ? this.sanitize(context) : {};

    const logEntry = {
      timestamp,
      level,
      message,
      ...sanitizedContext,
    };

    // In production, only log to console for errors
    // In other environments, log everything
    if (IS_PRODUCTION) {
      if (level === 'error') {
        console.error(JSON.stringify(logEntry));
      }
      // TODO: Send to logging service (DataDog, Sentry, etc.)
    } else {
      // Development logging
      const prefix = `[${level.toUpperCase()}] ${timestamp}`;
      console.log(prefix, message, sanitizedContext);
    }
  }

  info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  error(message: string, context?: LogContext) {
    this.log('error', message, context);
  }

  debug(message: string, context?: LogContext) {
    if (!IS_PRODUCTION) {
      this.log('debug', message, context);
    }
  }
}

export const logger = new Logger();
