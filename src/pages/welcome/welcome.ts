import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';
import { User } from '../../providers/user';
import { MainPage } from '../../pages/pages';
import { TranslateService } from '@ngx-translate/core';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  private loginErrorString: string;
  
  constructor(public navCtrl: NavController, public user: User, 
    public toastCtrl: ToastController, public translateService: TranslateService,
    private fb: Facebook, private platform: Platform, public afAuth: AngularFireAuth) {
      this.translateService.get('LOGIN_ERROR').subscribe((value) => {
        this.loginErrorString = value;
      });
     }

loginfacebook(isScanner)  {
  if (this.platform.is('cordova')) {
    return this.fb.login(['email', 'public_profile']).then(res => {
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
       firebase.auth().signInWithCredential(facebookCredential);
       this.navCtrl.push(MainPage);
    }).catch(err => this.showLoginError());
  }
  else {
    return this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => this.navCtrl.push(MainPage))
      .catch(err => this.showLoginError())
  }
}
showLoginError(){
          // Unable to log in
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
}
    }
