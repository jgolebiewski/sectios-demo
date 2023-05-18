import { DetailsList, IColumn, Link, SelectionMode } from '@fluentui/react';
import { Report } from '../../../domain/Report';
import moment from 'moment/moment';
import { DEFAULT_DATETIME_FORMAT } from '../../../../core/defaults';

import { useReportList } from '../../hooks/useReportList';

export const ReportsList = (): JSX.Element => {
    const { reports, isLoading, isSuccess } = useReportList();

    const columns: IColumn[] = [
        {
            key: 'key1',
            minWidth: 100,
            name: 'ID',
            fieldName: 'id',
        },
        {
            key: 'key2',
            minWidth: 200,
            name: 'Created',
            fieldName: 'created',
            onRender: (item: Report) => moment(item.created).format(DEFAULT_DATETIME_FORMAT),
        },
        {
            key: 'key3',
            minWidth: 400,
            name: '',
            onRender: (item: Report) => (
                <>
                    <Link href={'summary' + item.id}>Show summary</Link>
                    &nbsp;&nbsp;
                    <Link href={'report/' + item.id}>Full vacation report</Link>
                </>
            ),
        },
    ];

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {isSuccess && <DetailsList items={reports} columns={columns} selectionMode={SelectionMode.none} />}
            {isSuccess && reports.length === 0 && <h5>No records</h5>}
        </div>
    );
};
