import { CountrySelector } from '@reports/ui/CountrySelector/CountrySelector';
import { FormError } from '@reports/ui/FormError/FormError';
import { useFormContext } from 'react-hook-form';
import { Report } from '../../machines/reportCreator.machine';

export const ChooseCountry = (): JSX.Element => {
    const {
        control,
        formState: { errors },
    } = useFormContext<Report>();

    return (
        <section className="mb-10">
            <CountrySelector name="countries" label="Choose countries" control={control} />
            <FormError>{(errors && errors.countries?.message) || ''}</FormError>
        </section>
    );
};
