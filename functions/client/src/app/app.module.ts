import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

// import { StoreModule } from '@ngrx/store'
// import { EffectsModule } from '@ngrx/effects'
// import { StoreDevtoolsModule } from '@ngrx/store-devtools'
// import { StoreRouterConnectingModule, routerReducer, RouterStateSerializer, RouterAction, RouterNavigationAction } from '@ngrx/router-store'
// import { RouterStateSnapshot } from '@angular/router'
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth'

// import { SuiModule } from 'ng2-semantic-ui'

import { UserModule } from './core/user/user.module'

import { AppRoutingModule } from './app.routing'
import { AppPageComponent } from './app.component'

// import { SNAuthModule } from './core/snauth/snauth.module'
// import { SNDomainModule } from './core/sndomain/sndomain.module'
// import { SorryModule } from './core/sorry/sorry.module'
// import { SNEntsModule } from './core/snents/snents.module'
import { environment } from '../environments/environment'

// export function reducer(state = {}, action) { return state }

// export interface RouterState {
//   url: string,
// }

// export class CustomSerializer implements RouterStateSerializer<RouterState> {
//   serialize(routerState: RouterStateSnapshot): RouterState {
//     const { url } = routerState
//     return { url }
//   }
// }


@NgModule({
  declarations: [
    AppPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'sparks-angular-firebase'}),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    // StoreModule.forRoot({routerReducer}),
    // EffectsModule.forRoot([]),
    // SuiModule,
    AppRoutingModule,
    UserModule,
    // StoreRouterConnectingModule,
    // SNAuthModule,
    // SNDomainModule,
    // SorryModule,
    // SNEntsModule,
    // StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  // providers: [
  //   { provide: RouterStateSerializer, useClass: CustomSerializer}
  // ],
  bootstrap: [AppPageComponent]
})
export class AppModule { }
