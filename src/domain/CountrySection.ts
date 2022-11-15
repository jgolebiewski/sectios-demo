import { AccommodationOption } from '../core/types';
import { City } from './City';
import { Country } from './Country';
import { MeanOfTransport } from './MeanOfTransport';
import { Period } from './Period';

export class CountrySection {
    country: Country | null;
    cities: City[] | null;
    period: Period;
    accommodations: AccommodationOption[];
    meansOfTransport: MeanOfTransport[];

    constructor() {
        this.country = null;
        this.period = new Period();
        this.accommodations = [];
        this.meansOfTransport = [];
        this.cities = [];
    }
}
