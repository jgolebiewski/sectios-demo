import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { CustomDatePicker } from '../../common/CustomDatePicker/CustomDatePicker';
import { CustomDropdown } from '../../common/CustomDropdown/CustomDropdown';
import { CustomTextField } from '../../common/CustomTextField/CustomTextField';
import { routeTypes } from '../../data/routes-types';
import { ReportModel } from '../../domain/ReportModel';
import { RouteWrapper } from './RouteComponent.styled';
import moment from 'moment';

interface RouteComponentProps {
    index: number;
}

const calculateDuration = (start: string, end: string): string => {
    const endDateMoment = moment(end);
    const startDateMoment = moment(start);
    return moment.duration(endDateMoment.diff(startDateMoment)).humanize();
}

export const RouteComponent: FC<RouteComponentProps> = ({ index }): JSX.Element => {

    const { control, setValue } = useFormContext<ReportModel>();

    // const [startDate, endDate] = watch([`routes.${index}.startDate`, `routes.${index}.endDate`]);
    const startDate = useWatch({ control, name: `routes.${index}.startDate` });
    const endDate = useWatch({ control, name: `routes.${index}.endDate` });


    const duration = calculateDuration(startDate, endDate);


    useEffect(() => {
        setValue(`routes.${index}.duration`, duration);

    }, [setValue, duration, index]);


    return <RouteWrapper>
        <h4>Route</h4>
        <CustomTextField
            name={`routes.${index}.name`}
            control={control}
            label="Name"
        />
        <CustomDatePicker
            name={`routes.${index}.startDate`}
            control={control}
            label="Start date"
        />
        <CustomDatePicker
            name={`routes.${index}.endDate`}
            control={control}
            label="End date"
        />
        <CustomTextField
            name={`routes.${index}.duration`}
            control={control}
            label="Route duration"
            disabled
        />
        <CustomDropdown
            name={`routes.${index}.type`}
            control={control}
            label="Route type"
            options={routeTypes}
        />
    </RouteWrapper>
}
