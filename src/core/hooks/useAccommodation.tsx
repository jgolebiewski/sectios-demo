import { IDropdownOption } from '@fluentui/react';
import { useQuery } from 'react-query';
import { DataService } from '../services/DataService';

interface UseAccommodation {
    options: IDropdownOption[];
    isSuccess: boolean;
}

export const useAccommodation = (): UseAccommodation => {
    const { data, isSuccess } = useQuery(
        'accommodation',
        async () => {
            const response = await DataService.getAccommodations();
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
