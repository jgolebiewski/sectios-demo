import { useFormContext } from 'react-hook-form';
import { CustomTextField } from '../../common/CustomTextField/CustomTextField';
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
        <CustomTextField
            name="overview.name"
            label="Name"
            control={control}
        />

        <CustomTextField
            name="overview.author"
            control={control}
            label="Author"
        />
    </OverViewWrapper>
}
