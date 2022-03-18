import { v4 as uuidv4 } from 'uuid';

export class RouteModel {
    id: string = uuidv4();

    name: string = 'Route ' + Math.ceil(Math.random() * 100);

    startDate: string = (new Date()).toISOString();

    endDate: string = (new Date()).toISOString();

    type: string = 'normal';
}