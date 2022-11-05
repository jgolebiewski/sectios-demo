import styled from 'styled-components';

export const ButtonsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    column-gap: 20vw;
    border-top: 1px solid #cccccc;
    padding-top: 20px;
`;

export const CreatorWrapper = styled.section`
    width: 60vh;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    padding: 20px 30px;
    margin: 30px auto;
    background-color: white;
    min-height: 30vh;

    h1 {
        text-align: center;
    }
`;

export const ReportCreatorSection = styled.section`
    min-height: 20vh;
    margin-bottom: 10px;
`;
