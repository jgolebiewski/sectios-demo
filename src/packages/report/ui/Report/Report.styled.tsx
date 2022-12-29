import styled from 'styled-components';

export const ReportWrapper = styled.div`
    width: 90vw;
    display: grid;
    grid-template-columns: 20vw 1fr;
    margin-bottom: 15vh;
`;

export const TittleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ReportContent = styled.div`
    background-color: white;
    padding: 20px;
    width: 60vw;
`;

export const ButtonsBar = styled.div`
    position: fixed;
    bottom: 1vh;
    width: 100%;

    div {
        width: 18vw;
        margin: 0 auto;
        /* border: 1px solid red; */
        background-color: white;
        padding: 20px;
        text-align: center;
        box-shadow: 0 0 20px rgb(0 0 0 / 30%);
    }
`;
