import { FieldErrorsImpl } from 'react-hook-form';
import { CountryOption, MeanOfTransportOption } from '../../../core/types';

export interface DraftReport {
    from: string;
    to: string;
    numberOfPeople: number | null;
    meansOfTransport: MeanOfTransportOption[];
    countries: CountryOption[];
    creationDate?: Date;
    id?: string;
}
export type DraftReportErrors = FieldErrorsImpl<DraftReport>;

export interface DraftReportContext {
    data: DraftReport;
    formErrors: DraftReportErrors | null;
}
