import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatNumber(value: number) {
    return new Intl.NumberFormat('pt-BR').format(value);
}

export function formatDate(date: string) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

export function isPaginatedData<TData>(data: any): data is IPaginatedData<TData> {
    return (data as IPaginatedData<TData>).results !== undefined;
}