import { TextField } from '@fluentui/react';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { CustomFieldProps } from '../CustomFieldProps';

export const CustomTextField: FC<CustomFieldProps> = (props): JSX.Element => {
    const { name, label, control, disabled, isRequired } = props;
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => <TextField {...field} label={label} disabled={disabled} required={isRequired} />}
        />
    );
};
