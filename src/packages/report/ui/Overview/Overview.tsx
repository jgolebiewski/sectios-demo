import { useFormContext } from 'react-hook-form';
import { CustomTextField } from '@reports/ui';
import { Wrapper } from '../Wrapper/Wrapper.styled';
import { OverviewModel } from '../../domain/OverviewModel';
import { Report } from '../../../../domain/Report';
import { PeriodComponent } from '@reports/ui/PeriodComponent/PeriodComponent';
import { FormError } from '@reports/ui/FormError/FormError';
import { ErrorMessage } from '@hookform/error-message';

interface OverviewProps {
    overview?: OverviewModel;
}

export const Overview: React.FC<OverviewProps> = (props) => {
    const {
        control,
        formState: { errors },
    } = useFormContext<Report>();

    return (
        <Wrapper>
            <h3>General Section</h3>
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
    );
};
