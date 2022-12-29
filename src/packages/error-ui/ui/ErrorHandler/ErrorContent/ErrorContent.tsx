import { MessageBar, MessageBarType } from '@fluentui/react';
import { ErrorContentWrapper } from './ErrorContent.styled';

import { useState } from 'react';

export const ErrorContent = ({
    error,
    resetErrorBoundary,
}: {
    error: Error;
    resetErrorBoundary: () => void;
}): JSX.Element => {
    const [isProd, setIsProd] = useState(false);

    return (
        <ErrorContentWrapper>
            <MessageBar messageBarType={MessageBarType.error} isMultiline={true}>
                <b>Error occurred:</b>

                <pre>{error.message}</pre>
                <div>{!isProd && error.stack}</div>
            </MessageBar>
        </ErrorContentWrapper>
    );
};
