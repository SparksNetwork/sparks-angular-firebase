import { NgModule } from '@angular/core'

import { UserService } from './user.service'
import { RedirectIfUser } from './redirect-if-user.guard'
import { RedirectToJoinIfNotUser } from './redirect-to-join-if-not-user.guard'
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
    RedirectToJoinIfNotUser,
    AwaitFirstAuth,
  ],
})
export class UserModule { }

