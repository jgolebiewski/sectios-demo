import { v4 as uuidv4 } from 'uuid';

export class SectionFieldModel {
    id: string = uuidv4();
    name = '';
    value = '';

    constructor(data?: { name: string; value: string }) {
        if (data) {
            Object.assign(this, data);
        }
    }
}
