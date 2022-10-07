import { CountrySelector } from '@reports/ui/CountrySelector/CountrySelector';
import { FormError } from '@reports/ui/FormError/FormError';
import { useFormContext } from 'react-hook-form';

export const ChooseCountry = (): JSX.Element => {
    const {
        control,
        formState: { errors },
    } = useFormContext<{ countries: any[] }>();

    return (
        <section>
            <CountrySelector name="countries" label="Choose countries" control={control} />
            <FormError>{(errors && errors.countries?.message) || ''}</FormError>
        </section>
    );
};
