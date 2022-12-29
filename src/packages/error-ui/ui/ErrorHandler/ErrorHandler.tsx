import { ErrorBoundary } from 'react-error-boundary';
import { Logger } from '../../domain/Logger';
import { ErrorContent } from './ErrorContent/ErrorContent';

interface ErrorBoundaryProps {
    logger: Logger;
    children?: React.ReactNode;
}

export const ErrorHandler = (props: ErrorBoundaryProps): JSX.Element => {
    const { logger, children } = props;
    const onErrorHandler = (error: Error, info: { componentStack: string }) => {
        logger.debug(error.message);
        logger.info(info.componentStack);
    };

    return (
        <ErrorBoundary FallbackComponent={ErrorContent} onError={onErrorHandler}>
            {children}
        </ErrorBoundary>
    );
};
