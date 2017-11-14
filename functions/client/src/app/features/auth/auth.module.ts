import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { SNUIModule } from '../../shared/snui/snui.module'
import { AuthRoutingModule, routedComponents } from './auth.routing'

// import { FormEmailPasswordComponent } from './form-email-password/form-email-password.component'
// import { AlertErrorComponent } from './alert-error/alert-error.component'
// import { FormResetPasswordComponent } from './form-reset-password/form-reset-password.component'
// import { SocialBlockComponent } from './social-block/social-block.component';
// import { HeaderAuthComponent } from './header-auth/header-auth.component'

import { AuthSocialButtonsComponent } from './components/auth-social-buttons.component'
import { AuthStateService } from './auth.state'

@NgModule({
  declarations: [
    routedComponents,
    AuthSocialButtonsComponent,
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
    // SNUIModule,
    AuthRoutingModule,
  ],
  providers: [
    AuthStateService,
  ],
})
export class AuthModule { }

