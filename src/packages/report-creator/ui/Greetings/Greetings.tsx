import { PrimaryButton } from '@fluentui/react';
import { GreetingsWrapper } from './Greetings.styled';

export const Greetings = ({ handleStart }: { handleStart: () => void }): JSX.Element => {
    return (
        <GreetingsWrapper>
            <h1>Welcome to your vacation report creator</h1>
            <p>You will have only a few question to answer.</p>
            <PrimaryButton onClick={handleStart}>Lets start</PrimaryButton>
        </GreetingsWrapper>
    );
};
