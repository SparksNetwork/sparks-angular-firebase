import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SNAuthModule } from './core/snauth/snauth.module'

import { environment } from '../environments/environment'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'sparks-angular-firebase'}),
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    SNAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
