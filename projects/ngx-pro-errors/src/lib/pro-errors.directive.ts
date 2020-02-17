import {
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IErrorDetails, ErrorOptions } from './pro-errors';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { toArray } from './utils/toArray';

@Directive({
  selector: '[libNgxErrors]',
  exportAs: 'ngxErrors'
})
export class ProErrorsDirective implements OnChanges, OnDestroy, AfterViewInit {
  // tslint:disable-next-line: no-input-rename
  @Input('ngxErrors') private readonly controlName: string;

  subject$: BehaviorSubject<IErrorDetails>;
  control: AbstractControl;
  private ready = false;

  constructor(private form: FormGroupDirective) {}

  get errors() {
    if (!this.ready) {
      return;
    }
    return this.control.errors;
  }

  get hasErrors() {
    return !!this.errors;
  }

  hasError(name: string, conditions: ErrorOptions): boolean {
    return this.checkPropState('invalid', name, conditions);
  }

  isValid(name: string, conditions: ErrorOptions): boolean {
    return this.checkPropState('valid', name, conditions);
  }

  getError(name: string) {
    if (!this.ready) {
      return;
    }
    return this.control.getError(name);
  }

  private checkPropState(
    prop: string,
    name: string,
    conditions: ErrorOptions
  ): boolean {
    if (!this.ready) {
      return;
    }

    const controlPropsState =
      !conditions ||
      toArray(conditions).every((condition: string) => this.control[condition]);

    if (name.charAt(0) === '*') {
      return this.control[prop] && controlPropsState;
    }

    return prop === 'valid'
      ? !this.control.hasError(name)
      : this.control.hasError(name) && controlPropsState;
  }

  private checkStatus(): void {
    const control = this.control;
    const errors = control.errors;
    this.ready = true;

    if (!errors) {
      return;
    }

    errors.forEach((errorName: any) => {
      this.subject$.next({ control, errorName });
    });
  }

  ngOnChanges() {
    this.control = this.form.control.get(this.controlName);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.checkStatus();
      this.control.statusChanges.subscribe({
        next: this.checkStatus.bind(this),
        error: () => console.log('error'),
        complete: () => console.log('completed')
      });
    });
  }

  ngOnDestroy() {
    this.subject$.complete();
  }
}
