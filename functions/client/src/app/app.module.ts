import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreRouterConnectingModule, routerReducer, RouterStateSerializer, RouterAction, RouterNavigationAction } from '@ngrx/router-store'
import { RouterStateSnapshot } from '@angular/router'
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'

import { SuiModule } from 'ng2-semantic-ui'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SNAuthModule } from './core/snauth/snauth.module'
import { SNDomainModule } from './core/sndomain/sndomain.module'
import { SorryModule } from './core/sorry/sorry.module'
import { SNEntsModule } from './core/snents/snents.module'
import { environment } from '../environments/environment'

export function reducer(state = {}, action) { return state }

export interface RouterState {
  url: string,
}

export class CustomSerializer implements RouterStateSerializer<RouterState> {
  serialize(routerState: RouterStateSnapshot): RouterState {
    const { url } = routerState
    return { url }
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'sparks-angular-firebase'}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    StoreModule.forRoot({router: routerReducer}),
    EffectsModule.forRoot([]),
    SuiModule,
    AppRoutingModule,
    StoreRouterConnectingModule,
    SNAuthModule,
    SNDomainModule,
    SorryModule,
    SNEntsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
