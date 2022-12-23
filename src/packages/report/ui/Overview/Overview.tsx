import { useFormContext } from 'react-hook-form';
import { CustomTextField } from '@reports/ui';
import { Wrapper } from '../Wrapper/Wrapper.styled';
import { OverviewModel } from '../../domain/OverviewModel';
import { Report } from '../../../../domain/Report';
import { PeriodComponent } from '@reports/ui/PeriodComponent/PeriodComponent';
import { FormError } from '@reports/ui/FormError/FormError';

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
            <FormError>{(errors && errors.budgetAssumed?.message) || ''}</FormError>

            <CustomTextField isRequired={true} name="budgetSpent" control={control} label="Budget spent" />
            <FormError>{(errors && errors.budgetSpent?.message) || ''}</FormError>

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
