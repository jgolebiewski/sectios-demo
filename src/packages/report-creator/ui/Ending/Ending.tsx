import { Link } from '@fluentui/react';
import { ReportCreatorSection } from '../ReportCreator.styled';
import { EndingWrapper } from './Ending.styled';

export const Ending = (): JSX.Element => {
    return (
        <ReportCreatorSection>
            <EndingWrapper>
                <h1>Thank you!</h1>
                <p>We appreciate your answers.</p>
                <Link href="/">Go to dashboard</Link>
            </EndingWrapper>
        </ReportCreatorSection>
    );
};
