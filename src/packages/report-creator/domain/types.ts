import { FieldErrorsImpl } from 'react-hook-form';
import { CountryOption, MeanOfTransportOption } from '../../../core/types';

export interface DraftReport {
    from: Date;
    to: Date;
    numberOfPeople: number;
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
