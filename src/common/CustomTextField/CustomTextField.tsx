import { TextField } from '@fluentui/react';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form'
import { ReportModel } from '../../domain/ReportModel';

type TextFieldProps = {
    name: any;
    label: string;
    control: Control<ReportModel, object>
}

export const CustomTextField: FC<TextFieldProps> = (props): JSX.Element => {

    const { name, label, control } = props;

    return <Controller
        name={name}
        control={control}
        render={({ field }) => <TextField {...field} label={`C: ${label}`} />}
    />
}