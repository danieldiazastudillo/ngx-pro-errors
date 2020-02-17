import { NgModule } from '@angular/core';
import { ProErrorDirective } from './pro-error.directive';
import { ProErrorsDirective } from './pro-errors.directive';



@NgModule({
  declarations: [ProErrorDirective, ProErrorsDirective],
  imports: [
  ],
  exports: [ProErrorDirective, ProErrorsDirective]
})
export class NgxProErrorsModule { }
