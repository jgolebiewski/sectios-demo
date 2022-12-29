import { Meta, ComponentStory } from '@storybook/react';
import { ErrorHandler } from './ErrorHandler';
import { Logger } from '@reports/error-ui/domain/Logger';
import { action } from '@storybook/addon-actions';

const send = action('logger');
export const StorybookLogger: Logger = {
    send,
    debug: (...args) => send('DEBUG', ...args),
    info: (...args) => send('INFO', ...args),
    warn: (...args) => send('WARN', ...args),
    error: (...args) => send('ERROR', ...args),
};

interface KaboomProps {
    shouldFail?: () => boolean;
    // notify?(message: string): void;
    children?: any;
}

const throwAlways = () => true;
const Kaboom = (props: KaboomProps): JSX.Element => {
    const { shouldFail = throwAlways, children } = props;
    if (shouldFail()) {
        // notify?.('KaboomSync: fail');
        throw new Error('Kaboom!');
    }
    // notify?.('KaboomSync: pass');
    return <>Nothing happen </>;
};

export default {
    title: 'UI/ErrorMessage',
    component: ErrorHandler,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const _ErrorMessage: ComponentStory<typeof ErrorHandler> = (args: any) => {
    return (
        <ErrorHandler logger={StorybookLogger}>
            <Kaboom />
        </ErrorHandler>
    );
};
