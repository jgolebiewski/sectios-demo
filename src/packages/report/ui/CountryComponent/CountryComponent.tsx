import { PeriodComponent } from '@reports/ui/PeriodComponent/PeriodComponent';
import { useFormContext } from 'react-hook-form';
import { Wrapper } from '../Wrapper/Wrapper.styled';
import { Country } from '../../../../domain/Country';
import { AccommodationSelector } from '@reports/ui/AccommodationSelector/AccommodationSelector';
import { FormError } from '@reports/ui/FormError/FormError';
import { CustomMultiselect } from '../../../ui/CustomMultiselect/CustomMultiselect';
import { MeanOfTransportSelector } from '@reports/ui/MeansOfTransportSelector/MeansOfTransportSelector';
import { ReportForm } from '../../data/ReportForm';
import { CountrySectionForm } from '../../data/CountrySectionsForm';

export const CountryComponent = ({ index, country }: { index: number; country: Country | null }): JSX.Element => {
    const {
        control,
        formState: { errors },
    } = useFormContext<ReportForm>();

    const getErrorMessage = (field: keyof CountrySectionForm): string => {
        let msg = '';

        if (errors && errors.countrySectionForm) {
            const tmp = errors.countrySectionForm[index];
            msg = tmp ? tmp[field]?.message || '' : '';
        }

        return msg;
    };

    return (
        <Wrapper>
            <h5>{country?.name}</h5>

            <CustomMultiselect
                control={control}
                label="Cities"
                name={`countrySectionForm.${index}.cities`}
                options={country?.cities.map((c) => ({ key: c.id, text: c.name })) || []}
            />
            <FormError>{getErrorMessage('cities')}</FormError>
            <PeriodComponent
                fromField={`countrySectionForm.${index}.period.from`}
                toField={`countrySectionForm.${index}.period.to`}
                control={control}
                label="Period"
                errors={errors}
            />
            <AccommodationSelector
                name={`countrySectionForm.${index}.accommodationOption`}
                label="Accommodation"
                control={control}
                errors={errors}
            />
            <FormError>{getErrorMessage('accommodationOption')}</FormError>

            <MeanOfTransportSelector
                control={control}
                name={`countrySectionForm.${index}.meansOfTransportOption`}
                label="Means of transports"
            />
            <FormError>{getErrorMessage('meansOfTransportOption')}</FormError>
        </Wrapper>
    );
};
