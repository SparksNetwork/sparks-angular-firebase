import { Injectable, EventEmitter } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import * as firebase from 'firebase'
import { AngularFireAuth } from 'angularfire2/auth'

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
export class UserService {
  public auth: firebase.auth.Auth

  public current$: Observable<User>
  public isAuthed$: Observable<boolean>

  public error = new EventEmitter<AuthError | null>()
  public errorMessage = new Observable<string | null>()

  private providers = {
    facebook: new FacebookProvider(),
    google: new GoogleProvider(),
  }

  constructor(
    public afAuth: AngularFireAuth
  ) {
    this.isAuthed$ = this.afAuth.authState
      .map(Boolean)

    this.current$ = this.afAuth.authState
      .filter(Boolean)

    this.errorMessage = this.error
      .map(err => err ? (HUMAN_ERROR_MESSAGES[err.code] || err.message) as string : null)

    this.isAuthed$.subscribe(isAuthed => console.log('user.isAuthed$', isAuthed))

    this.current$.subscribe(current => console.log('user.current$', current))

    this.error.subscribe(err => {
      if (err) { console.log('auth error', err) }
    })

    // this is some super-hacky shit that exposes auth to e2e tests
    window['auth'] = this.afAuth.auth
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

  public createWithEmailAndPassword(email: string, password: string, continueURL: string = '/') {
    this.error.emit(null)
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      // "Domain not whitelisted" if anything else goes; replace localhost with actual host in email action handler
      .then((user: User) => user.sendEmailVerification({url: 'https://localhost' + continueURL}))
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
      // .then(() => location.reload())
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

  /**
   * 
   * @param code 
   * @description https://firebase.google.com/docs/reference/js/firebase.auth.Auth#verifyPasswordResetCode
   */
  public verifyPasswordResetCode(code: string) {
    return this.afAuth.auth.verifyPasswordResetCode(code)
      .catch((err: AuthError) => this.error.emit(err));
  }

  /**
   * 
   * @param code 
   * @param newPassword
   * @description https://firebase.google.com/docs/reference/js/firebase.auth.Auth#confirmPasswordReset
   */
  public confirmPasswordReset(code: string, newPassword: string) {
    return this.afAuth.auth.confirmPasswordReset(code, newPassword)
      .catch((err: AuthError) => this.error.emit(err));
  }
}