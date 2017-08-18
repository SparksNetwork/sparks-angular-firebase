import { Component, ViewChild } from '@angular/core';

import { AuthService } from "../../../core/snauth/auth/auth.service";
import { FormEmailPasswordComponent } from "../form-email-password/form-email-password.component";

@Component({
  selector: 'auth-page-signin',
  templateUrl: 'page-signin.component.html'
})

export class PageSigninComponent {
  @ViewChild(FormEmailPasswordComponent) public epForm: FormEmailPasswordComponent

  public isSignUp: boolean;
  public title: string;
  public caption: string;
  public switchBtnCaption: string;
  public switchBtnTitle: string;
  public switchAction: any;

  constructor(private auth: AuthService) {
    this.toLogin()
  }

  signInWithFacebook() {
    this.auth.signInWithFacebook()
  }

  signInWithGoogle() {
    this.auth.signInWithGoogle()
  }

  signInWithEmailAndPassword() {
    this.auth.signInWithEmailAndPassword(
      this.epForm.credentialsForm.value.email,
      this.epForm.credentialsForm.value.password
    )
  }

  toSignup() {
    this.isSignUp = true;
    this.caption = 'Sign up';
    this.title = 'Wellcome to Sparks.Network'
    this.switchBtnCaption = 'Log in';
    this.switchBtnTitle = 'Log in to Sparks.Network'
    this.switchAction = this.toLogin;
  }

  toLogin() {
    this.isSignUp = false;
    this.caption = 'Log in'
    this.title = 'Log in to Sparks.Network';
    this.switchBtnCaption = 'Sign up'
    this.switchBtnTitle = 'Wellcome to Sparks.Network'
    this.switchAction = this.toSignup;
  }

}