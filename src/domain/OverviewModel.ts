import { v4 as uuidv4 } from 'uuid';

export class OverviewModel {
    id: string = uuidv4();

    name: string = 'Report name';

    author: string = 'John Wick';
}