import { DEFAULT_DATE_FORMAT } from '../../../../core/defaults';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { DataService } from '../../../../core/services/DataService';
import { SummaryLabel } from './ReportSummary.styled';
import { DraftReport } from '../../domain/types';
import { ReportCreatorSection } from '../ReportCreator.styled';
import { Country } from '../../../domain/Country';
import { MeanOfTransport } from '../../../domain/MeanOfTransport';

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
            const selected: Country[] = [];
            value.forEach((countryOption) => {
                const v = countries.filter((country) => country.id === countryOption);
                selected.push(...v);
            });

            return selected.map((c) => c.name).join(', ');
        }

        if (field === 'meansOfTransport' && Array.isArray(value)) {
            const selected: MeanOfTransport[] = [];

            value.forEach((meanOption) => {
                const values = means.filter((mean) => mean.id === meanOption);
                selected.push(...values);
            });

            return selected.map((c) => c.name).join(', ');
        }

        if (value.toString().indexOf('Z') !== -1 && !Array.isArray(value)) {
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
