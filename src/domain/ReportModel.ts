import { v4 as uuidv4 } from 'uuid';
import { SectionModel } from './SectionModel';
import { OverviewModel } from './OverviewModel';
import { RouteModel } from './RouteModel';
import { SectionFieldModel } from './SectionFieldModel';
export class ReportModel {
    id: string = uuidv4();

    name = '';

    sections: SectionModel[] = [
        new SectionModel({
            name: 'Section 1',
            fields: [
                new SectionFieldModel({ name: 'Field 1', value: 'some value' }),
                new SectionFieldModel({ name: 'Field 2', value: '' }),
            ],
        }),
        new SectionModel({
            name: 'Section 2',
            fields: [
                new SectionFieldModel({ name: 'Field 3', value: '' }),
                new SectionFieldModel({ name: 'Field 4', value: '' }),
            ],
        }),
        new SectionModel({
            name: 'Section 3',
            fields: [
                new SectionFieldModel({ name: 'Field 5', value: '' }),
                new SectionFieldModel({ name: 'Field 6', value: '' }),
            ],
        }),
    ];

    overview: OverviewModel = new OverviewModel();

    routes: RouteModel[] = [new RouteModel(), new RouteModel()];
}
