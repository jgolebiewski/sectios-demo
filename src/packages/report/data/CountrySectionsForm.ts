import { AccommodationOption, MeanOfTransportOption } from '../../../core/types';
import { CountrySection } from '../../../domain/CountrySection';

export class CountrySectionForm extends CountrySection {
    accommodationOption: AccommodationOption[];

    meansOfTransportOption: MeanOfTransportOption[];

    constructor(countrySection: CountrySection) {
        super();
        Object.assign(this, countrySection);
        this.accommodationOption = [];
        this.meansOfTransportOption = [];

        this.meansOfTransportOption = countrySection.meansOfTransport.map((mOt) => mOt.id);
        this.accommodationOption = countrySection.accommodations.map((acc) => acc.id);
    }
}
