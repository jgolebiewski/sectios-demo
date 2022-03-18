import { DatePicker, defaultDatePickerStrings } from '@fluentui/react';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { CustomFieldProps } from '../../domain/CustomFieldProps';



export const CustomDatePicker: FC<CustomFieldProps> = ({ name, label, control }) => {

    return <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <DatePicker
                {...field}
                value={new Date(field.value)}
                onSelectDate={(date: Date | null | undefined) => {
                    field.onChange(date ? date.toISOString() : null)
                }}
                placeholder="Select a date..."
                label={label}
                strings={defaultDatePickerStrings} />
        )}
    />
}