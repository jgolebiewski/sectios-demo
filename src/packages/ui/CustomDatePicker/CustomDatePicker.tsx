import { DatePicker, defaultDatePickerStrings } from '@fluentui/react';
import { CustomFieldProps } from '../CustomFieldProps';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { DEFAULT_DATE_FORMAT } from '../../../core/defaults';
import moment from 'moment';

interface DatePickerProps {
    minDate?: Date;
    maxDate?: Date;
}

export const CustomDatePicker: FC<CustomFieldProps & DatePickerProps> = ({
    name,
    label,
    control,
    disabled,
    minDate,
    maxDate,
    isRequired,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <>
                    <DatePicker
                        {...field}
                        value={field.value ? new Date(field.value) : undefined}
                        onSelectDate={(date: Date | null | undefined) => {
                            field.onChange(date ? date.toISOString() : null);
                        }}
                        formatDate={(date?: Date) => moment(date).format(DEFAULT_DATE_FORMAT)}
                        placeholder="Select a date..."
                        label={label}
                        strings={defaultDatePickerStrings}
                        disabled={disabled}
                        minDate={minDate}
                        maxDate={maxDate}
                        isRequired={isRequired}
                    />
                </>
            )}
        />
    );
};
