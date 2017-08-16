import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SNAuthModule } from './core/snauth/snauth.module'
import { SNDomainModule } from './core/sndomain/sndomain.module'
import { SorryModule } from './core/sorry/sorry.module'

import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'sparks-angular-firebase'}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    SNAuthModule,
    SNDomainModule,
    SorryModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
