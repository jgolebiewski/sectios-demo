import { Meta, ComponentStory } from '@storybook/react';
import { ErrorHandler } from './ErrorHandler';

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
        <ErrorHandler>
            <Kaboom />
        </ErrorHandler>
    );
};
