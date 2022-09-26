import { CustomDatePicker } from '@reports/ui';
import moment from 'moment';
import { useFormContext, useWatch } from 'react-hook-form';
import { ChoosePeriodWrapper } from './ChoosePeriod.styled';

const calculateDuration = (start: string | null, end: string | null): string => {
    const endDateMoment = moment(end);
    const startDateMoment = moment(start);
    return moment.duration(endDateMoment.diff(startDateMoment)).humanize();
};

export const ChoosePeriod = (): JSX.Element => {
    const {
        control,
        formState: { errors },
    } = useFormContext<{ from: string | null; to: string | null }>();

    const startDate = useWatch({ control, name: `from` });
    const endDate = useWatch({ control, name: `to` });

    const duration = calculateDuration(startDate, endDate);

    return (
        <>
            <ChoosePeriodWrapper>
                <div>
                    <CustomDatePicker
                        name="from"
                        label="Date from"
                        control={control}
                        isRequired={true}
                        maxDate={new Date()}
                    />
                    <small>
                        <em>{errors && errors.from?.message}</em>
                    </small>
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
                    <small>
                        <em>{errors && errors.to?.message}</em>
                    </small>
                </div>
            </ChoosePeriodWrapper>

            <pre>{duration}</pre>
        </>
    );
};