import { TextField } from '@fluentui/react';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form'
import { ReportModel } from '../../domain/ReportModel';

type TextFieldProps = {
    name: any;
    label: string;
    disabled?: boolean;
    control: Control<ReportModel, object>
}

export const CustomTextField: FC<TextFieldProps> = (props): JSX.Element => {

    const { name, label, control, disabled } = props;

    return <Controller
        name={name}
        control={control}
        render={({ field }) => <TextField {...field} label={label} disabled={disabled} />}
    />
}