import { Logger, LogParams } from '@reports/error-ui/domain/Logger';

export class ConsoleLogger implements Logger {
    send(level: 'INFO' | 'DEBUG', message: string, params?: { [index: string]: any } | undefined): void {
        throw new Error('Method not implemented.');
    }
    debug(message: string, params?: LogParams) {
        console.log(
            `%cDEBUG: %c${message}`,
            'background-color: yellow; padding: 2px; font-weight: bold;',
            'background-color:white; color: red;'
        );
    }

    info(message: string, params?: LogParams) {
        console.info(
            `%cINFO: %c${message}`,
            'background-color: #f0f8ff; color: #252d33; padding: 4px',
            'background-color:white;'
        );
    }

    warn(message: string, params?: LogParams) {
        console.warn(`%cWARN`, params || '');
        console.warn(message);
    }

    error(message: string, params?: LogParams) {
        console.error(`ERROR: ${message}`);
    }
}
