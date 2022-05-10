import { useFormContext } from 'react-hook-form';
import { ReportModel } from '../../domain/ReportModel';
import styled from 'styled-components';

const NavStyled = styled.nav`
    width: 20vw;
    border: 1px solid red;
`;

interface NavProps {
    report: ReportModel;
}

export const ReportNavigation = (props: NavProps): JSX.Element => {
    const ctx = useFormContext<ReportModel>();

    console.log(ctx);
    return (
        <NavStyled>
            <h4>Navigation</h4>
            {Object.keys(ctx.control._fields).map((field, idx) => (
                <p key={idx}>{field}</p>
            ))}
        </NavStyled>
    );
};
