"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiError = createApiError;
function createApiError(statusCode, message, isOperational = true) {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.isOperational = isOperational;
    Error.captureStackTrace(error, createApiError);
    return error;
}
