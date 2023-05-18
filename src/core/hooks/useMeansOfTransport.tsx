import { useQuery } from 'react-query';
import { DataService } from '../services/DataService';
import { IDropdownOption } from '@fluentui/react';

interface UseMeansOfTransport {
    options: IDropdownOption[];
    isSuccess: boolean;
}

export const useMeansOfTransport = (): UseMeansOfTransport => {
    const { data, isSuccess } = useQuery(
        'meansOfTransport',
        async () => {
            const response = await DataService.getMeansOfTransport();
            return response.data.map((mt) => ({ key: mt.id, id: mt.id, text: mt.name }));
        },
        {
            useErrorBoundary: true,
            initialData: [],
        }
    );

    return {
        options: data || [],
        isSuccess,
    };
};
