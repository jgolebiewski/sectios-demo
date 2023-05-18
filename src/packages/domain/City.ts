import { v4 as uuidv4 } from 'uuid';

export class City {
    constructor(public id: string, public name: string) {
        this.id = uuidv4();
    }
}
