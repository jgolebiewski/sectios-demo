import { useFormContext } from 'react-hook-form';
import { ReportModel } from '../../domain/ReportModel';
import styled from 'styled-components';
import { Report } from '../../../../domain/Report';

const NavStyled = styled.nav`
    width: 20vw;
    border: 1px solid red;
`;

interface NavProps {
    report: Report;
}

export const ReportNavigation = (props: NavProps): JSX.Element => {
    // const ctx = useFormContext<ReportModel>();

    console.log(props);
    return (
        <NavStyled>
            <h4>Navigation</h4>
            {/*{Object.keys(ctx.control._fields).map((field, idx) => (*/}
            {/*    <p key={idx}>{field}</p>*/}
            {/*))}*/}
        </NavStyled>
    );
};
