import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
    private readonly logger = new Logger('Application');

    logRequest(req: any) {
        const { method, originalUrl, httpVersion, statusCode, ip } = req;
        const timestamp = new Date().toLocaleString();

        this.logger.verbose(`Request: ${method} ${originalUrl} (HTTP/${httpVersion}) - Status: ${statusCode} - IP: ${ip} - Timestamp: ${timestamp}`);
    }

    logResponse(context: string, responseLog: any) {
        const timestamp = new Date().toLocaleString();

        this.logger.verbose(`Response for ${context} - Status: ${responseLog.statusCode} - Headers: ${JSON.stringify(responseLog.headers)} - Body: ${JSON.stringify(responseLog.body)} - Timestamp: ${timestamp}`);
    }

    logError(error: any, context: string) {
        const timestamp = new Date().toLocaleString();

        this.logger.error(`${context} - ${error.message} - Timestamp: ${timestamp}`);
    }
}