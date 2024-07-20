// src/application/services/logger.service.ts
export interface LoggerService {
  debug(message: unknown): void;
  info(message: unknown): void;
  error(message: unknown, err?: Error): void; // Allow an optional second Error argument
  warning(message: unknown): void;
}
