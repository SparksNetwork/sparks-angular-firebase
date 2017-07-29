import { NgModule } from '@angular/core';

import { AngularFireAuthModule } from 'angularfire2/auth'

import { UserService } from './user/user.service';

@NgModule({
  imports: [
    AngularFireAuthModule,
  ],
  exports: [],
  declarations: [],
  providers: [
    UserService,
  ],
})
export class SNAuthModule { }
