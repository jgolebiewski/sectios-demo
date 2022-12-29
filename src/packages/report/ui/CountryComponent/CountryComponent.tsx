import { PeriodComponent } from '@reports/ui/PeriodComponent/PeriodComponent';
import { useFormContext } from 'react-hook-form';
import { Wrapper } from '../Wrapper/Wrapper.styled';
import { Country } from '../../../../domain/Country';
import { AccommodationSelector } from '@reports/ui/AccommodationSelector/AccommodationSelector';
import { FormError } from '@reports/ui/FormError/FormError';
import { CustomMultiselect } from '../../../ui/CustomMultiselect/CustomMultiselect';
import { MeanOfTransportSelector } from '@reports/ui/MeansOfTransportSelector/MeansOfTransportSelector';
import { ReportForm } from '../../domain/ReportForm';
import { ErrorMessage } from '@hookform/error-message';

export const CountryComponent = ({ index, country }: { index: number; country: Country | null }): JSX.Element => {
    const {
        control,
        formState: { errors },
    } = useFormContext<ReportForm>();

    return (
        <Wrapper>
            <h4>{country?.name}</h4>

            <CustomMultiselect
                control={control}
                label="Cities"
                isRequired={true}
                name={`countrySectionForm.${index}.cities`}
                options={country?.cities.map((c) => ({ key: c.id, text: c.name })) || []}
            />
            <ErrorMessage
                errors={errors}
                name={`countrySectionForm.${index}.cities`}
                render={({ message }) => <FormError>{message}</FormError>}
            />

            <PeriodComponent
                fromField={`countrySectionForm.${index}.period.from`}
                toField={`countrySectionForm.${index}.period.to`}
                control={control}
                label="Period"
                isRequired={true}
                errors={errors}
            />

            <AccommodationSelector
                name={`countrySectionForm.${index}.accommodationOption`}
                label="Accommodation"
                control={control}
                errors={errors}
                isRequired={true}
            />

            <MeanOfTransportSelector
                control={control}
                name={`countrySectionForm.${index}.meansOfTransportOption`}
                label="Means of transports"
                isRequired={true}
            />
        </Wrapper>
    );
};
