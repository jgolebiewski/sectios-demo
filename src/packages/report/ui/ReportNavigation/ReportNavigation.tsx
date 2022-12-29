import { Link } from '@fluentui/react';
import styled from 'styled-components';
import { ReportForm } from '../../domain/ReportForm';

const NavStyled = styled.nav`
    position: fixed;
    top: 10vh;

    div {
        font-size: 14px;
        margin: 10px 0;
    }
`;

interface NavProps {
    report: ReportForm;
}

export const ReportNavigation = (props: NavProps): JSX.Element => {
    // const ctx = useFormContext<ReportModel>();
    const { report } = props;
    const visitedCounties = props.report.countrySectionForm.map((c) => ({ name: c.country?.name, htmlId: c.htmlId }));
    console.log(props);

    const scroll = (htmlId: string) => {
        console.log({ htmlId });
        const element = document.getElementById(htmlId);
        console.log({ element });
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        }
    };

    return (
        <NavStyled>
            <h4>Navigation</h4>
            <div>
                <Link onClick={() => scroll(report.overview.htmlId)}>General Section</Link>
            </div>
            <div>Visited Countries</div>
            <ul>
                {visitedCounties.map((vc, index) => (
                    <li key={index}>
                        <Link onClick={() => scroll(vc.htmlId)}>{vc.name}</Link>
                    </li>
                ))}
            </ul>
            {/*{Object.keys(ctx.control._fields).map((field, idx) => (*/}
            {/*    <p key={idx}>{field}</p>*/}
            {/*))}*/}
        </NavStyled>
    );
};
