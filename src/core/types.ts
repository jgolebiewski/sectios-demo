// eslint-disable-next-line no-shadow
export enum MeansOfTransports {
    Airplane,
    Car,
    Train,
    Ferry,
}

export interface Country {
    key: number;
    text: string;
}

export interface MeanOfTransport {
    key: MeansOfTransports;
    text: string;
}

export interface Response<T> {
    data: T[];
}
