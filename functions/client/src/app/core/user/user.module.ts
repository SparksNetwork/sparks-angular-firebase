import { NgModule } from '@angular/core'

import { UserService } from './user.service'
import { RedirectIfUser } from './redirect-if-user.guard'
import { RedirectIfNotUser } from './redirect-if-not-user.guard'
import { AwaitFirstAuth } from './await-first-auth.resolver'

@NgModule({
  imports: [
    // CommonModule,
    // FormsModule,
    // ReactiveFormsModule,
    // SNUIModule,
    // AuthRoutingModule,
  ],
  providers: [
    UserService,
    RedirectIfUser,
    RedirectIfNotUser,
    AwaitFirstAuth,
  ],
})
export class UserModule { }

