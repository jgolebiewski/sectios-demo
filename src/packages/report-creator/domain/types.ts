import { FieldErrorsImpl } from 'react-hook-form';

export interface DraftReport {
    from: string;
    to: string;
    numberOfPeople: number | null;
    meansOfTransport: string[];
    countries: string[];
    creationDate?: Date;
    id?: string;
}
export type DraftReportErrors = FieldErrorsImpl<DraftReport>;

export interface DraftReportContext {
    data: DraftReport;
    formErrors: DraftReportErrors | null;
}
