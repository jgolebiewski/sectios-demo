import { Checkbox } from '@fluentui/react';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { CustomFieldProps } from '../CustomFieldProps';

export const CustomCheckbox: FC<CustomFieldProps> = ({ name, label, control, disabled, onChange }) => {
    return (
        <Controller
            name={name || ''}
            control={control}
            render={({ field }) => {
                return <Checkbox {...field} label={label} onChange={onChange} />;
            }}
        />
    );
};
