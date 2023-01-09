import { useCountries } from '../../../core/hooks/useCountries';
import { CustomFieldProps } from '../CustomFieldProps';
import { CustomMultiselect } from '../CustomMultiselect/CustomMultiselect';

export const CountrySelector = (props: CustomFieldProps): JSX.Element => {
    const { options } = useCountries();

    return <CustomMultiselect {...props} options={options} placeholder="Choose country" />;
};
