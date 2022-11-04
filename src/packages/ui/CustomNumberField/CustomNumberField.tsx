import { MaskedTextField } from '@fluentui/react';
import { Controller } from 'react-hook-form';
import { CustomFieldProps } from '../CustomFieldProps';

export const CustomNumberField = (props: CustomFieldProps): JSX.Element => {
    const { name, label, control, disabled } = props;
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <MaskedTextField {...field} label={label} disabled={disabled} mask="999999999" maskChar="" />
            )}
        />
    );
};
