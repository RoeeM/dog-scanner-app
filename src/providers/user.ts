import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
  }


  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this.afAuth.auth.signOut();
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        return true;
      } else {
       return false;
      }
    });
    
  }
  getName(){
    return firebase.auth().currentUser.displayName;
  }

  getEmail(){
    return firebase.auth().currentUser.email;
  }

  getPhoto(){
    return firebase.auth().currentUser.photoURL;
  }

  getId(){
    return firebase.auth().currentUser.uid;
  }


}
