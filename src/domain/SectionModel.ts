import { SectionFieldModel } from './SectionFieldModel';
import { v4 as uuidv4 } from 'uuid';

export class SectionModel {
    id: string = uuidv4();

    name = '';

    fields: SectionFieldModel[] = [];

    constructor(data?: { name: string; fields: SectionFieldModel[] }) {
        if (data) {
            Object.assign(this, data);
        }
    }
}
