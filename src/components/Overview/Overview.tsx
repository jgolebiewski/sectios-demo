import { useFormContext } from 'react-hook-form';
import { CustomTextField } from '../../common/CustomTextField/CustomTextField';
import { Wrapper } from '../../common/Wrapper/Wrapper.styled';
import { OverviewModel } from '../../domain/OverviewModel'
import { ReportModel } from '../../domain/ReportModel';


interface OverviewProps {
    overview?: OverviewModel;
}

export const OverView: React.FC<OverviewProps> = (props) => {

    const { control } = useFormContext<ReportModel>();

    return <Wrapper>
        <h3>Overview</h3>
        <CustomTextField
            name="overview.name"
            label="Name"
            control={control}
        />

        <CustomTextField
            name="overview.author"
            control={control}
            disabled={true}
            label="Author"
        />
    </Wrapper>
}
