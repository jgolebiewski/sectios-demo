import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { CustomDatePicker } from '../../common/CustomDatePicker/CustomDatePicker';
import { CustomDropdown } from '../../common/CustomDropdown/CustomDropdown';
import { CustomTextField } from '../../common/CustomTextField/CustomTextField';
import { routeTypes } from '../../data/routes-types';
import { ReportModel } from '../../domain/ReportModel';
import { RouteWrapper } from './RouteComponent.styled';

interface RouteComponentProps {
    index: number;
}


export const RouteComponent: FC<RouteComponentProps> = ({ index }): JSX.Element => {

    const context = useFormContext<ReportModel>();
    const control = context.control;

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
        <CustomDropdown
            name={`routes.${index}.type`}
            control={control}
            label="Route type"
            options={routeTypes}
        />
    </RouteWrapper>
}