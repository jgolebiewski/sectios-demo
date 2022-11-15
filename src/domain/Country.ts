import { v4 as uuidv4 } from 'uuid';
import { City } from './City';

export class Country {
    constructor(public id: string, public code: string, public name: string, public cities: City[]) {
        this.id = uuidv4();
    }
}
