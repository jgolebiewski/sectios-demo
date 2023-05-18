import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';
import { Report } from '@reports/domain';
import { CustomFieldProps } from '../CustomFieldProps';
import { CustomMultiselect } from '../CustomMultiselect/CustomMultiselect';
import { FormError } from '../FormError/FormError';
import { useAccommodation } from '../../../core/hooks/useAccommodation';

type Err = FieldErrors<Report> | undefined;

type AccommodationSelectorProps = CustomFieldProps & { errors: Err };

export const AccommodationSelector = (props: AccommodationSelectorProps): JSX.Element => {
    const { options } = useAccommodation();

    return (
        <div>
            <CustomMultiselect {...props} options={options} placeholder="Choose accommodations" />
            <ErrorMessage {...props} render={({ message }) => <FormError>{message}</FormError>} />
        </div>
    );
};
