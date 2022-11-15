import { IDropdownOption } from '@fluentui/react';

// eslint-disable-next-line no-shadow
export enum MeansOfTransports {
    Airplane,
    Car,
    Train,
    Ferry,
}

// export type CountryOption = IDropdownOption;
export type CountryOption = string;

export type MeanOfTransportOption = string;

export type AccommodationOption = IDropdownOption;

export type CityOption = IDropdownOption;

export interface Response<T> {
    data: T[];
}
