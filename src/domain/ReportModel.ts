import { SectionModel } from "./SectionModel";
import { v4 as uuidv4 } from 'uuid';

export class ReportModel {

    id: string = uuidv4();

    name: string = '';

    sections: SectionModel[] = [];

    clone(): ReportModel {
        const clone = new ReportModel();
        Object.assign(clone, this);
        return clone;
    }

}