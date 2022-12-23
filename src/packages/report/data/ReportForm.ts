import { Report } from '../../../domain/Report';
import { CountrySectionForm } from './CountrySectionsForm';

export class ReportForm extends Report {
    countrySectionForm: CountrySectionForm[];

    constructor(report: Report) {
        super();
        Object.assign(this, report);
        this.countrySectionForm = report.countrySections.map((cs) => new CountrySectionForm(cs));
    }
}
