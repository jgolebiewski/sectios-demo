import { SectionModel } from "./SectionModel";
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';
import { OverviewModel } from './OverviewModel';
import { RouteModel } from './RouteModel';
export class ReportModel {

    id: string = uuidv4();

    name: string = '';

    sections: SectionModel[] = [];

    overview: OverviewModel = new OverviewModel();

    routes: RouteModel[] = [
        new RouteModel(),
        new RouteModel()
    ];

    clone(): ReportModel {
        const clone = new ReportModel();
        Object.assign(clone, this);
        return cloneDeep(this);
    }

}