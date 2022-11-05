import { DEFAULT_DATE_FORMAT } from '../../../../core/defaults';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Country, MeanOfTransport } from '../../../../core/types';
import { DataService } from '../../../../core/services/DataService';
import { SummaryLabel } from './ReportSummary.styled';
import { DraftReport } from '../../domain/types';
import { ReportCreatorSection } from '../ReportCreator.styled';

export const ReportSummary = ({ report }: { report: DraftReport }): JSX.Element => {
    const fields = Object.keys(report) as Array<keyof typeof report>;
    const [countries, setCountries] = useState<Country[]>([]);
    const [means, setMeans] = useState<MeanOfTransport[]>([]);

    useEffect(() => {
        (async () => {
            const response = await DataService.getCountries();
            setCountries(response.data);
        })();

        (async () => {
            const response = await DataService.getMeansOfTransport();
            setMeans(response.data);
        })();
    }, []);

    const niceLabel = (field: keyof typeof report): string => {
        switch (field) {
            case 'countries':
                return 'Countries';
            case 'from':
                return 'From';
            case 'to':
                return 'To';
            case 'numberOfPeople':
                return 'Number of People';
            case 'meansOfTransport':
                return 'Means of transport';
            default:
                return '';
        }
    };

    const formatValue = (field: keyof typeof report) => {
        const value = report[field];

        if (!value) {
            return value;
        }

        if (field === 'countries' && Array.isArray(value)) {
            const v = countries.filter((country) => value.includes(country.key.toString()));
            return v.map((c) => c.text).join(', ');
        }

        if (field === 'meansOfTransport' && Array.isArray(value)) {
            const values = means.filter((mean) => value.includes(mean.key.toString()));
            return values.map((c) => c.text).join(', ');
        }

        if (value.toString().indexOf('Z') !== -1) {
            return moment(value).format(DEFAULT_DATE_FORMAT);
        } else {
            return value;
        }
    };

    return (
        <ReportCreatorSection>
            {fields.map((field, index: number) => (
                <div key={index}>
                    <SummaryLabel>{niceLabel(field)}</SummaryLabel>: {formatValue(field)}
                </div>
            ))}
        </ReportCreatorSection>
    );
};
