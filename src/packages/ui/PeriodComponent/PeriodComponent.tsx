import { ErrorMessage } from '@hookform/error-message';
import { Control, FieldErrors, useWatch } from 'react-hook-form';
import { CustomDatePicker } from '../CustomDatePicker/CustomDatePicker';
import { FormError } from '../FormError/FormError';
import { PeriodWrapper } from './PeriodComponent.styled';

interface PeriodComponentProps {
    fromField: string;
    toField: string;
    label: string;
    control: Control<any, object>;
    errors: FieldErrors<object> | undefined;
    isRequired?: boolean;
}

export const PeriodComponent = (props: PeriodComponentProps): JSX.Element => {
    const { fromField, toField, control, errors, label, isRequired } = props;

    const startDate = useWatch({ control, name: fromField });
    return (
        <PeriodWrapper isRequired={isRequired || false}>
            <label>{label}</label>
            <div>
                <CustomDatePicker name={fromField} label="Date from" control={control} maxDate={new Date()} />
                <ErrorMessage
                    errors={errors}
                    name={fromField}
                    render={({ message }) => <FormError>{message}</FormError>}
                />
            </div>
            <div>
                <CustomDatePicker
                    name={toField}
                    label="Date to"
                    control={control}
                    disabled={!startDate}
                    minDate={new Date(startDate || '')}
                />
                <ErrorMessage
                    errors={errors}
                    name={toField}
                    render={({ message }) => <FormError>{message}</FormError>}
                />
            </div>
        </PeriodWrapper>
    );
};
