import { ActionButton, IIconProps, TextField } from '@fluentui/react';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { CustomFieldProps } from '../../domain/CustomFieldProps';

const removeIcon: IIconProps = { iconName: 'Remove' };

export const CustomTextField: FC<CustomFieldProps> = (props): JSX.Element => {
    const { name, label, control, disabled } = props;

    const handleRemove = (d) => {
        console.log('remove dee');
    };

    return (
        <div>
            <ActionButton iconProps={removeIcon} text="Remove field" onClick={handleRemove} />
            <Controller
                name={name}
                control={control}
                render={({ field }) => <TextField {...field} label={label} disabled={disabled} />}
            />
        </div>
    );
};
