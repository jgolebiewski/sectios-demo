import { SectionFieldModel } from './SectionFieldModel';
import { v4 as uuidv4 } from 'uuid';


export class SectionModel {

    id: string = uuidv4();

    name: string = '';

    fields: SectionFieldModel[] = [];


    constructor(data?: { name: string, fields: SectionFieldModel[] }) {
        if (data) {
            Object.assign(this, data);
        }
    }

    clone(): SectionModel {
        const clone = new SectionModel();
        Object.assign(clone, this);
        return clone;
    }
}