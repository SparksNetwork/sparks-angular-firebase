import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs'

import * as firebase from 'firebase'
import { AngularFireAuth } from 'angularfire2/auth'

import 'rxjs/add/operator/map'

export type AuthError = firebase.FirebaseError
export type User = firebase.User

class FacebookProvider extends firebase.auth.FacebookAuthProvider {
  constructor() {
    super()
    this.addScope('email')
  }
}

class GoogleProvider extends firebase.auth.GoogleAuthProvider {
  constructor() {
    super()
    this.addScope('email')
  }
}

const HUMAN_ERROR_MESSAGES = {
  'auth/invalid-email': 'That doesn\'t look like a real e-mail address.  Try another?'
}

@Injectable()
export class AuthService {
  public auth: firebase.auth.Auth

  public current: Observable<User>
  public isAuthed: Observable<boolean>

  public error = new EventEmitter<AuthError | null>()
  public errorMessage = new Observable<string | null>()

  private providers = {
    facebook: new FacebookProvider(),
    google: new GoogleProvider(),
  }

  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.current = this.afAuth.authState

    this.errorMessage = this.error
      .map(err => err ? (HUMAN_ERROR_MESSAGES[err.code] || err.message) as string : null)

    this.isAuthed = this.afAuth.authState
      .map(authState => authState ? true : false)

    this.current.subscribe(authState => {
      console.log('authState', authState)
    })

    this.error.subscribe(err => {
      if (err) { console.log('auth error', err) }
    })
  }

  public signInWithGoogle() {
    this.error.emit(null)
    this.afAuth.auth.signInWithRedirect(this.providers.google)
  }

  public signInWithFacebook() {
    this.error.emit(null)
    this.afAuth.auth.signInWithRedirect(this.providers.facebook)
  }

  /**
   * 
   * @param email 
   * @param password
   * @description Sign in with the provided email and password.
   * If the login succedes reload page to be consistent with social login that does a reload. 
   */
  public signInWithEmailAndPassword(email: string, password: string) {
    this.error.emit(null)
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => location.reload())
      .catch((err: AuthError) => this.error.emit(err))
  }

  public createWithEmailAndPassword(email: string, password: string) {
    this.error.emit(null)
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user: User) => user.sendEmailVerification())
      .then(() => this.afAuth.auth.signInWithEmailAndPassword(email, password))
      .then(() => location.reload())
      .catch((err: AuthError) => this.error.emit(err))
  }

  public signOut() {
    this.afAuth.auth.signOut()
      .then(() => location.reload())
  }

  public applyActionCode(code: string) {
    return this.afAuth.auth.applyActionCode(code)
      .then(() => location.reload())
      .catch((err: AuthError) => this.error.emit(err))
  }

  public signInWithEmailAndPasswordWithoutRedirect(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch((err: AuthError) => this.error.emit(err));
  }

  /**
   * 
   * @param email 
   * @description https://firebase.google.com/docs/reference/js/firebase.auth.Auth#sendPasswordResetEmail
   */
  public sendPasswordResetEmail(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => { return email; })
      .catch((err: AuthError) => this.error.emit(err));
  }
}