import { PrimaryButton } from '@fluentui/react';
import { EndingWrapper } from './Ending.styled';

export const Ending = (): JSX.Element => {
    return (
        <EndingWrapper>
            <h1>Thank you!</h1>
            <p>We appreciate your answers.</p>
            <PrimaryButton>Go to dashboard</PrimaryButton>
        </EndingWrapper>
    );
};
