import { Logger, LogParams } from '@reports/error-ui/domain/Logger';

export class ConsoleLogger implements Logger {
    send(level: 'INFO' | 'DEBUG', message: string, params?: { [index: string]: any } | undefined): void {
        throw new Error('Method not implemented.');
    }
    debug(message: string, params?: LogParams) {
        console.log(`DEBUG: ${message}`, params || '');
    }

    info(message: string, params?: LogParams) {
        console.info(`INFO: ${message}`, params || '');
    }

    warn(message: string, params?: LogParams) {
        console.warn(`WARN: ${message}`, params || '');
    }

    error(message: string, params?: LogParams) {
        console.error(`ERROR: ${message}`, params || '');
    }
}
