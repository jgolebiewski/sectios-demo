import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';
import { Report } from '@reports/domain';
import { CheckboxGroup } from '../CheckboxGroup/CheckboxGroup';
import { CustomFieldProps } from '../CustomFieldProps';
import { FormError } from '../FormError/FormError';
import { useMeansOfTransport } from '../../../core/hooks/useMeansOfTransport';

type Err = FieldErrors<Report> | undefined;

type MeanOfTransportSelectorProps = CustomFieldProps;

export const MeanOfTransportSelector = (props: MeanOfTransportSelectorProps): JSX.Element => {
    const { options: means } = useMeansOfTransport();

    return (
        <div>
            <CheckboxGroup groups={means} {...props} />
            <ErrorMessage {...props} render={({ message }) => <FormError>{message}</FormError>} />
        </div>
    );
};
