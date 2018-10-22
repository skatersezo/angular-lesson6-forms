import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Chance} from 'chance';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  chance = new Chance();
  genders = ['Male', 'Female'];
  forbiddenUsernames = ['Cabron', 'Gilipollas', 'Mierda'];

  // A FormGroup is just a Group of form controls, in the end, is the same as when we use the TD approach
  signUpForm: FormGroup;

  constructor() { }

  ngOnInit() {
    // We initialize the form and set up inside as arguments the form controls that it will have it
    // each form control receives a default value and a validators (single or an array)
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(
          null,
          [
            Validators.required,
            this.forbiddenNames.bind(this) // at the time angular calls this function, 'this' don't refers anymore this class.
            // We need to use .bind(this)
          ]),
        'email': new FormControl(
          null,
          [
            Validators.required,
            Validators.email
          ], // Async validators don't go with normal ones!!!
          this.forbiddenEmails.bind(this)
        ),
      }),
      'gender': new FormControl('Male'),
      'hobbies': new FormArray([])
    });

    // A way to subscribe to any changes in our form
    // this.signUpForm.valueChanges.subscribe(
    //   value => console.log(value)
    // );

    this.signUpForm.statusChanges.subscribe(
      status => console.log(status)
    );
  }

  onSubmit() {
    console.log(this.signUpForm);
    this.signUpForm.reset({
      'gender': this.chance.gender(), // this will set a value for the radio buttons
    });
  }

  onAddHobby() {
    const hobbyFormControl = new FormControl(null, Validators.required);
    // in TypesScript this is how to perform casting
    // let castedType: Type = (<Type>Object);
    (<FormArray>this.signUpForm.get('hobbies')).push(hobbyFormControl);
  }

  deleteHobbie(index: number) {
    (<FormArray>this.signUpForm.get('hobbies')).removeAt(index);
  }

  /**
   * This function is a custom validator that blocks the user to provide concrete usernames
   * @param {FormControl} The FormControl that holds the value we want to control
   * @returns {{[p: string]: boolean}} This is a Typescript special notation for key-value structures,
   *                                    where 'p' stands for any parameter that will be of type string,
   *                                    this will be the name of the attribute for booleans
   */
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    } else {
      // IMPORTANT! If validation is succesfull you have to return null.
      return null;
    }
  }

  /**
   * This function is an example of a custom asynchronous validator
   * @param {FormControl} FormControl for email
   * @returns {Promise<any> | Observable<any>} We still provide the key-value pair, but we do it with a Promise or Observable
   */
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'test@test.com') {
            resolve({'emailIsForbidden': true});
          } else {
            resolve(null);
          }
        }, 2000);
      });
    return promise;
  }

  // We can use patchValue to modify one or several values in the form
  onRandomName() {
    this.signUpForm.patchValue({
      'userData': {
        'username': this.chance.name()
      }
    });
  }
// We can use setValue to modify the entire form
  onRandomValues() {
    this.signUpForm.setValue({
      'userData': {
        'username': this.chance.name(),
        'email': this.chance.email()
      },
      'gender': this.chance.gender(),
      'hobbies': []
    });
  }

}
