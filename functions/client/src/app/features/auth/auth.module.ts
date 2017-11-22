import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SuiCollapseModule } from 'ng2-semantic-ui'

// import { SNUIModule } from '../../shared/snui/snui.module'
import { AuthRoutingModule, routedComponents } from './auth.routing'

// import { FormEmailPasswordComponent } from './form-email-password/form-email-password.component'
// import { AlertErrorComponent } from './alert-error/alert-error.component'
// import { FormResetPasswordComponent } from './form-reset-password/form-reset-password.component'
// import { SocialBlockComponent } from './social-block/social-block.component';
// import { HeaderAuthComponent } from './header-auth/header-auth.component'

import { AuthGoogleButtonComponent } from './components/auth-google-button.component'
import { AuthFacebookButtonComponent } from './components/auth-facebook-button.component'
import { AuthEmailPasswordInputsComponent } from './components/auth-email-password-inputs'
import { AuthAppbarComponent } from './components/auth-appbar.component'

import { AuthStateService } from './auth.state'

@NgModule({
  declarations: [
    routedComponents,
    AuthGoogleButtonComponent,
    AuthFacebookButtonComponent,
    AuthEmailPasswordInputsComponent,
    AuthAppbarComponent,
    // FormEmailPasswordComponent,
    // AlertErrorComponent,
    // FormResetPasswordComponent,
    // SocialBlockComponent,
    // HeaderAuthComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuiCollapseModule,
    // SNUIModule,
    AuthRoutingModule,
  ],
  providers: [
    AuthStateService,
  ],
})
export class AuthModule { }

