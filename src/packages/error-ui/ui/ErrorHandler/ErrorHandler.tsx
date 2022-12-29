import { ErrorBoundary } from 'react-error-boundary';
import { ErrorContent } from './ErrorContent/ErrorContent';

interface ErrorBoundaryProps {
    children?: React.ReactNode;
}

export const ErrorHandler = (props: ErrorBoundaryProps): JSX.Element => {
    const onErrorHandler = (error: Error, info: { componentStack: string }) => {
        console.log(error);
        console.log(info);
    };

    return (
        <ErrorBoundary FallbackComponent={ErrorContent} onError={onErrorHandler}>
            {props.children}
        </ErrorBoundary>
    );
};
