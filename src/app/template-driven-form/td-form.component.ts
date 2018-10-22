import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Chance} from 'chance';

@Component({
  selector: 'app-td-form',
  templateUrl: './td-form.component.html',
  styleUrls: ['./td-form.component.css']
})
export class TdFormComponent implements OnInit {
  @ViewChild('form') signupForm: NgForm;
  defaultQuestion = 'pet';
  answer = '';
  genders = ['Male', 'Female'];
  chance = new Chance();
  user;

  constructor() { }

  ngOnInit() {
    console.log(this.chance.gender().toLowerCase());
  }

  defaultValues() {
    this.signupForm.setValue({
      userData: {
        username: this.chance.name(),
        email: this.chance.email({domain: 'default.com'}),
      },
      secretQuestion: 'pet',
      questionAnswer: this.chance.sentence(),
      gender: this.chance.gender()
    });
  }

  suggestUsername() {
    // we could only overwritte certain values of the form by doing
    this.signupForm.form.patchValue({
      userData: {
        username: this.chance.name()
      }
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.user = {
      username: form.value.userData.username,
      email: form.value.userData.email,
      gender: form.value.gender,
      secretQuestion: form.value.secretQuestion,
      secretAnswer: form.value.questionAnswer
    };
    form.reset();
  }

}
