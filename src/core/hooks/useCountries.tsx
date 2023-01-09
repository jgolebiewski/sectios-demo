import { IDropdownOption } from '@fluentui/react';
import { useQuery } from 'react-query';
import { DataService } from '../services/DataService';

interface UseCountries {
    options: IDropdownOption[];
}

export const useCountries = (): UseCountries => {
    const { data } = useQuery('countries', async () => {
        const response = await DataService.getCountries();
        const mapped = response.data.map((country) => ({ key: country.id, text: country.name }));
        return mapped;
    });

    return { options: data || [] };
};
