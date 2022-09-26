import { Control, FieldValues } from 'react-hook-form';

export interface CustomFieldProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: any;
    label: string;
    disabled?: boolean;
    control: Control<any, object>;
    isRequired?: boolean;
}
