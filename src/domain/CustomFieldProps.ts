import { Control } from 'react-hook-form';
import { ReportModel } from './ReportModel';

export interface CustomFieldProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: any;
    label: string;
    disabled?: boolean;
    control: Control<ReportModel, object>;
}
