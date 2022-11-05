import { CountrySelector } from '@reports/ui/CountrySelector/CountrySelector';
import { FormError } from '@reports/ui/FormError/FormError';
import { useFormContext } from 'react-hook-form';
import { DraftReport } from '../../domain/types';
import { ReportCreatorSection } from '../ReportCreator.styled';

export const ChooseCountry = (): JSX.Element => {
    const {
        control,
        formState: { errors },
    } = useFormContext<DraftReport>();

    return (
        <ReportCreatorSection>
            <CountrySelector name="countries" label="Choose countries" control={control} />
            <FormError>{(errors && errors.countries?.message) || ''}</FormError>
        </ReportCreatorSection>
    );
};
