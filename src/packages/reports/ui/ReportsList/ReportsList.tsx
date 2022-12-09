import { useEffect, useState } from 'react';
import { ReportsListService } from '../../services/ReportsListService';
import { DetailsList, IColumn, Link, SelectionMode } from '@fluentui/react';
import { Report } from '../../../../domain/Report';
import moment from 'moment/moment';
import { DEFAULT_DATETIME_FORMAT } from '../../../../core/defaults';

export const ReportsList = (): JSX.Element => {
    const [reports, setReports] = useState<Report[]>([]);

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
    useEffect(() => {
        (async () => {
            const response = await ReportsListService.getReports();
            setReports(response.data);
        })();
    }, []);

    return (
        <div>
            <DetailsList items={reports} columns={columns} selectionMode={SelectionMode.none} />
        </div>
    );
};
