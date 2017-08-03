import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SNUIModule } from '../../shared/snui/snui.module'
import { AuthRoutingModule, routedComponents } from './auth-routing.module'

import { FormEmailPasswordComponent } from './form-email-password/form-email-password.component'
import { ButtonSigninGoogleComponent } from './button-signin-google/button-signin-google.component'
import { ButtonSigninFacebookComponent } from './button-signin-facebook/button-signin-facebook.component'
import { AlertErrorComponent } from './alert-error/alert-error.component'

@NgModule({
  declarations: [
    routedComponents,
    FormEmailPasswordComponent,
    ButtonSigninGoogleComponent,
    ButtonSigninFacebookComponent,
    AlertErrorComponent,
  ],
  imports: [
    CommonModule,
    SNUIModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class AuthModule { }

