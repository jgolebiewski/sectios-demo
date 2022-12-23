import styled from 'styled-components';

export const PeriodWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    width: 100%;
    margin-top: 20px;

    label {
        grid-column: span 2;
    }
    div:first-child {
        margin: 0;
        padding: 0;
    }
`;
