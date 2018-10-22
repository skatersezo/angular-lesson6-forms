import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {TdFormComponent} from './template-driven-form/td-form.component';
import {ReactiveFormComponent} from './reactive-form/reactive-form.component';

const app_routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'td-form', component: TdFormComponent },
  { path: 'reactive-form', component: ReactiveFormComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(app_routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
