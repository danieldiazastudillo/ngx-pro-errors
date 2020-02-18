import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-test',
  templateUrl: './form-test.component.html',
  styleUrls: ['./form-test.component.scss']
})
export class FormTestComponent implements OnInit {

  // This props are just for binding purposes, they are not required to work with a form
  email: AbstractControl;
  name: AbstractControl;
  // -----------------------------------------------

  testForm: FormGroup;

  // Errors array. Probably you should provide these with a service or something like that to make
  // them app wide
  errors = [
    {
      name: 'required',
      text: 'This field is required. Custom Message',
      rules: ['touched', 'invalid']
    },
    {
      name: 'email',
      text: 'Must be a valid email address. Custom Message',
      rules: ['touched', 'invalid']
    },
    {
      name: 'minlength',
      text: 'This field is too short. Custom Message',
      rules: ['dirty']
    }
  ];

  constructor(private fb: FormBuilder) { }

  /**
   * Returns FormGroup object
   */
  private createForm(): FormGroup {
    const formObj = {
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]]
    };

    return this.fb.group(formObj);
  }

  /**
   * Binds FormGroup object to props so we can save some code in our HTML template
   * Not required.
   */
  private bindForm(): void {
    this.email = this.testForm.get('email');
    this.name = this.testForm.get('name');
  }

  /**
   * Submits form and logs props. Just to be sure...
   */
  onSubmit() {
    alert('Congratulations! Form submitted.');
    console.log('Form Values:');
    console.log(this.testForm.value);
  }

  ngOnInit(): void {
    this.testForm = this.createForm();
    this.bindForm();
  }

}
