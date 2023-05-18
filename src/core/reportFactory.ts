import { DraftReport } from '@reports/report-creator/domain/types';
import { Report } from '../packages/domain/Report';
import { CountrySection } from '../packages/domain/CountrySection';
import { Period } from '../packages/domain/Period';
import { DataService } from './services/DataService';

const countrySectionFactory = async (draft: DraftReport): Promise<CountrySection[]> => {
    const sections: CountrySection[] = [];
    const countries = await DataService.getCountries();
    const means = await DataService.getMeansOfTransport();

    draft.countries.forEach((countryString) => {
        const countrySection = new CountrySection();
        countrySection.period = new Period();
        countrySection.country = countries.data.find((country) => country.id === countryString) || null;

        draft.meansOfTransport.forEach((mt) => {
            const mean = means.data.find((m) => m.id === mt);
            if (mean) {
                countrySection.meansOfTransport.push(mean);
            }
        });

        sections.push(countrySection);
    });
    return sections;
};

const create = async (draftReport: DraftReport): Promise<Report> => {
    const report = new Report();
    report.vacationPeriod = Period.createFromString(draftReport.from, draftReport.to);
    report.countrySections = await countrySectionFactory(draftReport);

    return report;
};

export const ReportFactory = {
    create,
};
