import { Link, PrimaryButton } from '@fluentui/react';
import { ReportCreatorSection } from '../ReportCreator.styled';
import { GreetingsWrapper } from './Greetings.styled';

export const Greetings = ({ handleStart }: { handleStart: () => void }): JSX.Element => {
    return (
        <ReportCreatorSection>
            <GreetingsWrapper>
                <h1>Welcome to your vacation report creator</h1>
                <p>You will have only a few question to answer.</p>
                <PrimaryButton onClick={handleStart}>Lets start</PrimaryButton>
                &nbsp;&nbsp;
                <Link href="/">No, lets back</Link>
            </GreetingsWrapper>
        </ReportCreatorSection>
    );
};
