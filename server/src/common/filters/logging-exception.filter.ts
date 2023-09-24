import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class LoggingExceptionFilter implements ExceptionFilter {
    constructor(private readonly loggerService: LoggerService) { }

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        // Capture the error message
        const errorMessage = exception instanceof HttpException ? exception.getResponse() : 'Internal Server Error';

        // Log the error or message
        const context = `${request.method} ${request.originalUrl}`;

        if (status >= 400) {
            this.loggerService.logError(errorMessage, context);
        } else {
            this.loggerService.logResponse(context, {
                statusCode: status,
                headers: response.getHeaders(),
                body: response.send,
            });
        }


        // Send a response to the client
        response.status(status).json({
            status_code: status,
            timestamp: new Date().toLocaleString(),
            ip_address: getIPAddress(),
            path: request.url,
            errorMessage
        });
    }
}

function getIPAddress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];

        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
                return alias.address;
        }
    }
    return '0.0.0.0';
}