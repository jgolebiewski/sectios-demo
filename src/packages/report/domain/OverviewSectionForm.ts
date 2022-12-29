import { Period } from '../../../domain/Period';
import { v4 as uuidv4 } from 'uuid';

export class OverviewSectionForm {
    htmlId: string;

    constructor(public budgetAssumed: number, public budgetSpent: number, public vacationPeriod: Period) {
        this.htmlId = uuidv4();
    }
}
