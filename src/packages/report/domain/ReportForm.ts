import { Report } from '../../../domain/Report';
import { CountrySectionForm } from './CountrySectionsForm';
import { v4 as uuidv4 } from 'uuid';
import { OverviewSectionForm } from './OverviewSectionForm';

export class ReportForm extends Report {
    countrySectionForm: CountrySectionForm[];

    htmlId: string;

    overview: OverviewSectionForm;

    constructor(report: Report) {
        super();
        Object.assign(this, report);
        this.countrySectionForm = report.countrySections.map((cs) => new CountrySectionForm(cs));
        this.countrySections = [];
        this.htmlId = uuidv4();

        this.overview = new OverviewSectionForm(report.budgetAssumed, report.budgetSpent, report.vacationPeriod);
    }
}
