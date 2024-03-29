import { IDropdownOption } from '@fluentui/react';
import { useQuery } from 'react-query';
import { DataService } from '../services/DataService';

interface UseCountries {
    options: IDropdownOption[];
    isSuccess: boolean;
}

export const useCountries = (): UseCountries => {
    const { data, isSuccess } = useQuery(
        'countries',
        async () => {
            const response = await DataService.getCountries();
            const mapped = response.data.map((country) => ({ key: country.id, text: country.name }));
            return mapped;
        },
        {
            useErrorBoundary: true,
            initialData: [],
        }
    );

    return { options: data || [], isSuccess };
};
