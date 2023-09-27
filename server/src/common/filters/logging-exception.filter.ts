import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  ForbiddenException,
  GoneException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class LoggingExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Capture the error message
    // const errorMessage = exception instanceof HttpException ? JSON.stringify(exception.getResponse()) : 'Internal Server Error';

    let errorMessage = 'Internal Server Error';

    // Handle specific exceptions
    if (exception instanceof NotFoundException) {
      errorMessage = `Resource not found :: ${JSON.stringify(
        exception.getResponse(),
      )} `;
      status = HttpStatus.NOT_FOUND;
    } else if (exception instanceof UnauthorizedException) {
      errorMessage = `Unauthorized :: ${JSON.stringify(
        exception.getResponse(),
      )} `;
      status = HttpStatus.UNAUTHORIZED;
    } else if (exception instanceof ForbiddenException) {
      errorMessage = `Forbidden :: ${JSON.stringify(exception.getResponse())} `;
      status = HttpStatus.FORBIDDEN;
    } else if (exception instanceof BadRequestException) {
      errorMessage = `Bad Request :: ${JSON.stringify(
        JSON.stringify(exception.getResponse()),
      )} `;
      status = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof InternalServerErrorException) {
      errorMessage = `Internal server Error :: ${JSON.stringify(
        exception.getResponse(),
      )} `;
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    } else if (exception instanceof NotAcceptableException) {
      errorMessage = `Not Acceptable :: ${JSON.stringify(
        exception.getResponse(),
      )} `;
      status = HttpStatus.NOT_ACCEPTABLE;
    } else if (exception instanceof ConflictException) {
      errorMessage = `Conflict :: ${JSON.stringify(exception.getResponse())} `;
      status = HttpStatus.CONFLICT;
    } else if (exception instanceof GoneException) {
      errorMessage = `Gone :: ${JSON.stringify(exception.getResponse())} `;
      status = HttpStatus.GONE;
    } else if (exception instanceof ServiceUnavailableException) {
      errorMessage = `Service Unavailable :: ${JSON.stringify(
        exception.getResponse(),
      )} `;
      status = HttpStatus.SERVICE_UNAVAILABLE;
    }

    // Log the error with additional context
    const context = `${request.method} ${request.originalUrl}`;
    this.loggerService.logError(errorMessage, context, exception.stack);

    // Send a response to the client
    response.status(status).json({
      status_code: status,
      timestamp: new Date().toLocaleString(),
      ip_address: getIPAddress(),
      path: request.url,
      errorMessage,
    });
  }
}

function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      )
        return alias.address;
    }
  }
  return '0.0.0.0';
}
