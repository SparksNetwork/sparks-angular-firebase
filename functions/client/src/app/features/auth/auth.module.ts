import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SNUIModule } from '../../shared/snui/snui.module'
import { AuthRoutingModule, routedComponents } from './auth-routing.module'

import { EmailPasswordFormComponent } from './email-password-form/email-password-form.component'
import { GoogleLoginButtonComponent } from './google-login-button/google-login-button.component'
import { FacebookLoginButtonComponent } from './facebook-login-button/facebook-login-button.component'
import { ErrorAlertComponent } from './error-alert/error-alert.component'

@NgModule({
  declarations: [
    routedComponents,
    EmailPasswordFormComponent,
    GoogleLoginButtonComponent,
    FacebookLoginButtonComponent,
    ErrorAlertComponent,
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

