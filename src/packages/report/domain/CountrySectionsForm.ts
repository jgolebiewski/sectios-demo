import { AccommodationOption, MeanOfTransportOption } from '../../../core/types';
import { CountrySection } from '../../../domain/CountrySection';
import { v4 as uuidv4 } from 'uuid';

export class CountrySectionForm extends CountrySection {
    htmlId: string;

    accommodationOption: AccommodationOption[];

    meansOfTransportOption: MeanOfTransportOption[];

    constructor(countrySection: CountrySection) {
        super();
        Object.assign(this, countrySection);
        this.accommodationOption = [];
        this.meansOfTransportOption = [];

        this.meansOfTransportOption = countrySection.meansOfTransport.map((mOt) => mOt.id);
        this.accommodationOption = countrySection.accommodations.map((acc) => acc.id);

        this.htmlId = uuidv4();
    }
}
