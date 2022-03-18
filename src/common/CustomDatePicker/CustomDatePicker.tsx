import { DatePicker, defaultDatePickerStrings } from '@fluentui/react';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { ReportModel } from '../../domain/ReportModel';

interface CustomDatePickerProps {
    name: any;
    label: string;
    control: Control<ReportModel, object>
}

export const CustomDatePicker: FC<CustomDatePickerProps> = ({ name, label, control }) => {

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