import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuiModule } from 'ng2-semantic-ui'

import { SNUIModule } from '../../shared/snui/snui.module'
import { AuthRoutingModule, routedComponents } from './auth-routing.module'

import { FormEmailPasswordComponent } from './form-email-password/form-email-password.component'
import { AlertErrorComponent } from './alert-error/alert-error.component'
import { FormResetPasswordComponent } from './form-reset-password/form-reset-password.component'
import { SocialBlockComponent } from './social-block/social-block.component';
import { HeaderAuthComponent } from './header-auth/header-auth.component'
import { AppbarAuthComponent } from './appbar-auth.component'
import { ButtonGoogleComponent } from './button-google.component'
import { ButtonFacebookComponent } from './button-facebook.component'

@NgModule({
  declarations: [
    ...routedComponents,
    FormEmailPasswordComponent,
    AlertErrorComponent,
    FormResetPasswordComponent,
    SocialBlockComponent,
    HeaderAuthComponent,
    AppbarAuthComponent,
    ButtonGoogleComponent,
    ButtonFacebookComponent,
  ],
  imports: [
    CommonModule,
    SuiModule,
    SNUIModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class AuthModule { }

