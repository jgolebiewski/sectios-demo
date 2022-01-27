import { SectionFieldModel } from './SectionFieldModel';
import { v4 as uuidv4 } from 'uuid';


export class SectionModel {

    id: string = uuidv4();

    name: string = '';

    fields: SectionFieldModel[] = [];

    isValid: boolean = false;

    constructor(data?: {name: string, fields: SectionFieldModel[]}) {
        if (data) {
               Object.assign(this, data); 
        }
    }

    clone(): SectionModel {
        const clone = new SectionModel();
        Object.assign(clone, this);
        return clone;
    }

    validate(): void {
        this.isValid =  !this.fields.some(field => field.value.length === 0);
    }
}