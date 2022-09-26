import { Control, FieldValues } from 'react-hook-form';

export interface CustomFieldProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: any;
    label: string;
    disabled?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any, object>;
    isRequired?: boolean;
}
