import { Control } from 'react-hook-form';
import { ReportModel } from './ReportModel';

export interface CustomFieldProps {
    name: any;
    label: string;
    disabled?: boolean;
    control: Control<ReportModel, object>
}