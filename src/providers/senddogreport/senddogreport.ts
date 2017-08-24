import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { DogReport } from '../../models/dogreport';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';

import 'rxjs/add/operator/map';

/*
  Generated class    static send_dog_report(arg0: any): any {
        throw new Error("Method not implemented.");
    }
 for the SenddogreportProvider provider.
    static send_dog_report(arg0: any): any {
        throw new Error("Method not implemented.");
    }

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SenddogreportProvider {

  constructor(public db: AngularFireDatabase) {
    console.log('Hello SenddogreportProvider Provider');
  }

  public send_dog_report(report) {
    const relative_firebase_db = this.db.list('/dogreports');
    relative_firebase_db.push({report});
    return 1;
  }

}
