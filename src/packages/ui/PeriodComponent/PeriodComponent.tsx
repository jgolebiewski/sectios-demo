import { Control, FieldErrors, useWatch } from 'react-hook-form';
import { Report } from '../../../domain/Report';
import { CustomDatePicker } from '../CustomDatePicker/CustomDatePicker';
import { FormError } from '../FormError/FormError';
import { PeriodWrapper } from './PeriodComponent.styled';

interface PeriodComponentProps {
    fromField: string;
    toField: string;
    label: string;
    control: Control<any, object>;
    errors: FieldErrors<Report> | undefined;
}

export const PeriodComponent = (props: PeriodComponentProps): JSX.Element => {
    const { fromField, toField, control, errors, label } = props;

    const startDate = useWatch({ control, name: fromField });
    return (
        <PeriodWrapper>
            <label>{label}</label>
            <div>
                <CustomDatePicker
                    name={fromField}
                    label="Date from"
                    control={control}
                    isRequired={true}
                    maxDate={new Date()}
                />
                <FormError>{(errors && errors[fromField as keyof Report]?.message) || ''}</FormError>
            </div>
            <div>
                <CustomDatePicker
                    name={toField}
                    label="Date to"
                    control={control}
                    disabled={!startDate}
                    isRequired={true}
                    minDate={new Date(startDate || '')}
                />
                <FormError>{(errors && errors[toField as keyof Report]?.message) || ''}</FormError>
            </div>
        </PeriodWrapper>
    );
};
