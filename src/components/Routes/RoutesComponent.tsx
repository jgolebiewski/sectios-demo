import { FC } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Wrapper } from '../../common/Wrapper/Wrapper.styled';
import { ReportModel } from '../../domain/ReportModel';
import { RouteComponent } from '../Route/RouteComponent';



interface RoutesComponentProps {
    name?: string;
}

export const RoutesComponent: FC<RoutesComponentProps> = (props): JSX.Element => {
    const context = useFormContext<ReportModel>();

    const { fields: routes } = useFieldArray({
        name: 'routes',
        control: context.control
    });

    return <Wrapper>
        <h3>Routes</h3>
        {routes.map((item, i) => <RouteComponent index={i} key={item.id} />)}
    </Wrapper>
}