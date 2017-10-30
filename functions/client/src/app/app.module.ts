import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store'
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SNAuthModule } from './core/snauth/snauth.module'
import { SNDomainModule } from './core/sndomain/sndomain.module'
import { SorryModule } from './core/sorry/sorry.module'
import { SNEntsModule } from './core/snents/snents.module'
import { environment } from '../environments/environment'

export function reducer(state = {}, action) { return state }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'sparks-angular-firebase'}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    StoreModule.forRoot(reducer),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    AppRoutingModule,
    StoreRouterConnectingModule,
    StoreModule.forFeature('router', routerReducer),
    SNAuthModule,
    SNDomainModule,
    SorryModule,
    SNEntsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
