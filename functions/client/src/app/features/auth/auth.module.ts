import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SNUIModule } from '../../shared/snui/snui.module'
import { AuthRoutingModule, routedComponents } from './auth-routing.module'

import { FormEmailPasswordComponent } from './form-email-password/form-email-password.component'
import { AlertErrorComponent } from './alert-error/alert-error.component'
import { FormResetPasswordComponent } from './form-reset-password/form-reset-password.component'
import { SocialBlockComponent } from './social-block/social-block.component';
import { HeaderAuthComponent } from './header-auth/header-auth.component'

@NgModule({
  declarations: [
    routedComponents,
    FormEmailPasswordComponent,
    AlertErrorComponent,
    FormResetPasswordComponent,
    SocialBlockComponent,
    HeaderAuthComponent,
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

