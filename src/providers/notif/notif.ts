import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import 'rxjs/add/operator/map';

/*
  Generated class for the NotifProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class NotifProvider {

  constructor(public http: Http, private push: Push) {
    
  }

  start () {
    // to check if we have permission
    this.push.hasPermission()
    .then((res: any) => {
      if (res.isEnabled) {
        console.log('We have permission to send push notifications');
      } else {
        console.log('We do not have permission to send push notifications');
      }
    });

    // to initialize push notifications
    const options: PushOptions = {
      android: {
          senderID: '12345679'
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);
    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
}
