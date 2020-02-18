import { Directive, OnInit, OnDestroy, DoCheck, Input, HostBinding, Inject, forwardRef } from '@angular/core';
import { ErrorOptions } from './pro-errors';
import { toArray } from './utils/toArray';
import { combineLatest, Subscription, Subject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { ProErrorsDirective } from './pro-errors.directive';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[ngxError]'
})
export class ProErrorDirective implements OnInit, OnDestroy, DoCheck {

  @Input() set ngxError(value: ErrorOptions) {
    this.errorNames = toArray(value);
  }

  @Input() set when(value: ErrorOptions) {
    this.rules = toArray(value);
  }

  @HostBinding('hidden') public hidden = true;

  private errorNames: string[] = [];
  private rules: string[] = [];
  private subscription: Subscription;
  private statesSubject$: Subject<string[]>;
  private states$: Observable<string[]>;


  constructor(@Inject(forwardRef(() => ProErrorsDirective)) private ngxErrors: ProErrorsDirective) { }

  ngOnInit() {
    this.statesSubject$ = new Subject<string[]>();
    this.states$ = this.statesSubject$.asObservable().pipe(distinctUntilChanged());

    const errors = this.ngxErrors.subject$.pipe(
      filter(Boolean),
      // tslint:disable-next-line: no-bitwise
      filter((obj: any) => !!~this.errorNames.indexOf(obj.errorName))
    );

    const states = this.states$.pipe(
      // tslint:disable-next-line: no-bitwise no-shadowed-variable
      map(states => this.rules.every(rule => !!~states.indexOf(rule)))
    );

    this.subscription = combineLatest([states, errors]).subscribe({
      next: ([statesComb, errorsComb]) => {
        return this.hidden = !(statesComb && errorsComb.control.hasError(errorsComb.errorName));
      }
    });
  }

  ngDoCheck() {
    this.statesSubject$.next(
      this.rules.filter(rule => (this.ngxErrors.control as any)[rule])
    );
  }

  ngOnDestroy() {
    this.statesSubject$.complete();
    this.subscription.unsubscribe();
  }



}
