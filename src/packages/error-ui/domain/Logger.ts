export type LogParams = {
    [index: string]: any;
};

export interface Logger {
    send(level: 'INFO' | 'DEBUG', message: string, params?: LogParams): void;
    debug(message: string, params?: LogParams): void;
    info(message: string, params?: LogParams): void;
    warn(message: string, params?: LogParams): void;
    error(message: string, params?: LogParams): void;
}
