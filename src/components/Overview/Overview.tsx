import { TextField } from '@fluentui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { OverviewModel } from '../../domain/OverviewModel'
import { ReportModel } from '../../domain/ReportModel';
import { OverViewWrapper } from './Overview.styled';

interface OverviewProps {
    overview?: OverviewModel;
}

export const OverView: React.FC<OverviewProps> = (props) => {

    const { control } = useFormContext<ReportModel>();

    return <OverViewWrapper>
        <h2>Overview</h2>
        <Controller
            name="overview.name"
            control={control}
            render={({ field }) => <TextField {...field} label='Name' />}
        />
        <Controller
            name="overview.author"
            control={control}
            render={({ field }) => <TextField {...field} label='Author' />}
        />
    </OverViewWrapper>
}
