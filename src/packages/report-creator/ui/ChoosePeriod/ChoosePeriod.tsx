import { CustomDatePicker } from '@reports/ui';
import { FormError } from '@reports/ui/FormError/FormError';
import moment from 'moment';
import { useFormContext, useWatch } from 'react-hook-form';
import { DraftReport } from '../../domain/types';
import { ReportCreatorSection } from '../ReportCreator.styled';
import { ChoosePeriodWrapper } from './ChoosePeriod.styled';

const calculateDuration = (start: string | null, end: string | null): string => {
    if (!start || !end) {
        return '';
    }
    const endDateMoment = moment(end);
    const startDateMoment = moment(start);
    return moment.duration(endDateMoment.diff(startDateMoment)).humanize();
};

export const ChoosePeriod = (): JSX.Element => {
    const {
        control,
        formState: { errors },
    } = useFormContext<DraftReport>();

    const startDate = useWatch({ control, name: `from` });
    const endDate = useWatch({ control, name: `to` });

    const duration = calculateDuration(startDate, endDate);

    return (
        <ReportCreatorSection>
            <ChoosePeriodWrapper>
                <div>
                    <CustomDatePicker
                        name="from"
                        label="Date from"
                        control={control}
                        isRequired={true}
                        maxDate={new Date()}
                    />
                    <FormError>{(errors && errors.from?.message) || ''}</FormError>
                </div>
                <div>
                    <CustomDatePicker
                        name="to"
                        label="Date to"
                        control={control}
                        disabled={!startDate}
                        isRequired={true}
                        minDate={new Date(startDate || '')}
                    />
                    <FormError>{(errors && errors.to?.message) || ''}</FormError>
                </div>
            </ChoosePeriodWrapper>

            {duration && <h5>Duration: {duration}</h5>}
        </ReportCreatorSection>
    );
};
