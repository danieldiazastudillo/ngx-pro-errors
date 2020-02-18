import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxProErrorsModule } from './../../../ngx-pro-errors/src/lib/ngx-pro-errors.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormTestComponent } from './form-test/form-test.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    FormTestComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxProErrorsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
