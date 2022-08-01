import { ActionButton, IIconProps } from '@fluentui/react';
import styled from 'styled-components';

interface ButtonProps {
    handleRemove: () => void;
}

const RemoveButtonStyled = styled(ActionButton)`
    position: absolute;
    right: 0;
    z-index: 9;
`;

export const RemoveButton = (props: ButtonProps): JSX.Element => {
    const removeIcon: IIconProps = { iconName: 'Delete' };
    return <RemoveButtonStyled iconProps={removeIcon} text="" onClick={props.handleRemove} />;
};
