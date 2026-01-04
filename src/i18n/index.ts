import { en } from './en';
import { ta } from './ta';

export const dictionaries = {
    en,
    ta,
};

export type Language = 'en' | 'ta';
export type Dictionary = typeof en;
