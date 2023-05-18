import { City } from './City';
import { Country } from './Country';
import { MeanOfTransport } from './MeanOfTransport';
import { Period } from './Period';
import { v4 as uuidv4 } from 'uuid';
import { Accommodation } from './Accommodation';

export class CountrySection {
    id: string;
    country: Country | null;
    cities: City[] | null;
    period: Period;
    accommodations: Accommodation[];
    meansOfTransport: MeanOfTransport[];

    constructor() {
        this.id = uuidv4();
        this.country = null;
        this.period = new Period();
        this.accommodations = [];
        this.meansOfTransport = [];
        this.cities = [];
    }
}
