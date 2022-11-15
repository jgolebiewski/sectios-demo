import { ReportFactory } from './reportFactory';
import flushPromises from 'flush-promises';
import { DataService } from './services/DataService';

const draft = {
    from: '',
    to: '',
    numberOfPeople: 0,
    meansOfTransport: ['0'],
    countries: ['PL1'],
};

// jest.mock('HttpClient');
jest.mock('axios', () => jest.fn());

describe('Report Factory ', () => {
    beforeEach(() => {
        DataService.getCountries = jest.fn().mockImplementation(() =>
            Promise.resolve({
                data: [
                    {
                        id: 'PL1',
                        code: 'PL',
                        name: 'Poland',
                        cities: [
                            {
                                id: 'C1',
                                name: 'Warsaw',
                            },
                            {
                                id: 'C2',
                                name: 'Krakow',
                            },
                        ],
                    },
                ],
            })
        );
        DataService.getMeansOfTransport = jest.fn().mockImplementation(() =>
            Promise.resolve({
                data: [
                    {
                        id: '0',
                        name: 'Airplane',
                    },
                ],
            })
        );
    });

    it('should create report', async () => {
        const report = await ReportFactory.create(draft);
        await flushPromises();

        expect(report.countrySections.length).toBe(1);
        expect(report.countrySections[0].country?.name).toBe('Poland');
        expect(report.countrySections[0].country?.cities.length).toBe(2);
        expect(report.countrySections[0].country?.cities[1].name).toBe('Krakow');

        expect(report.countrySections[0].meansOfTransport.length).toBe(1);
        expect(report.countrySections[0].meansOfTransport[0].id).toBe('0');
    });
});
