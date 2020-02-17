import { AbstractControl } from '@angular/forms';

export type ErrorOptions = string | string[];

export interface IErrorDetails {
  control: AbstractControl;
  errorName: string;
}
