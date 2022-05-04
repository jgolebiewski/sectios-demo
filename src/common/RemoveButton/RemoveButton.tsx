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
    const removeIcon: IIconProps = { iconName: 'Remove' };
    return <RemoveButtonStyled iconProps={removeIcon} text="Remove field" onClick={props.handleRemove} />;
};
