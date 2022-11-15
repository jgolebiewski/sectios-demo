import { v4 as uuidv4 } from 'uuid';

import { CountrySection } from './CountrySection';
import { Period } from './Period';

export class Report {
    id: string;
    budgetAssumed: number;
    budgetSpent: number;
    vacationPeriod: Period;
    countrySections: CountrySection[];
    created: Date;

    constructor() {
        this.id = uuidv4();
        this.budgetAssumed = 0;
        this.budgetSpent = 0;
        this.vacationPeriod = new Period();
        this.countrySections = [];
        this.created = new Date();
    }
}
