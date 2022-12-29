import { useFormContext } from 'react-hook-form';
import { CustomTextField } from '@reports/ui';
import { Wrapper } from '../Wrapper/Wrapper.styled';
import { PeriodComponent } from '@reports/ui/PeriodComponent/PeriodComponent';
import { FormError } from '@reports/ui/FormError/FormError';
import { ErrorMessage } from '@hookform/error-message';
import { ReportForm } from '../../domain/ReportForm';
import { OverViewWrapper } from './Overview.styled';

export const Overview = ({ htmlId }: { htmlId: string }): JSX.Element => {
    const {
        control,
        formState: { errors },
    } = useFormContext<ReportForm>();

    return (
        <OverViewWrapper>
            <h3 id={htmlId}>General Section</h3>
            <Wrapper>
                <CustomTextField isRequired={true} name="budgetAssumed" label="Budget assumed" control={control} />
                <ErrorMessage
                    name="budgetAssumed"
                    errors={errors}
                    render={({ message }) => <FormError>{message}</FormError>}
                />

                <CustomTextField isRequired={true} name="budgetSpent" control={control} label="Budget spent" />

                <ErrorMessage
                    name="budgetSpent"
                    errors={errors}
                    render={({ message }) => <FormError>{message}</FormError>}
                />

                <PeriodComponent
                    fromField="vacationPeriod.from"
                    toField="vacationPeriod.to"
                    control={control}
                    errors={errors}
                    label="Vacations period"
                />
            </Wrapper>
        </OverViewWrapper>
    );
};
