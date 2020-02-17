import { ErrorOptions } from '../pro-errors';

export const toArray = (value: ErrorOptions): string[] => Array.isArray(value) ? value : [value];
