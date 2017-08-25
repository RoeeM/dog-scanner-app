import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


/*
  Generated class for the DogserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DogserviceProvider {

  constructor(public http: Http, private backgroundMode: BackgroundMode) { }

  startService() {
    this.backgroundMode.enable();
  }

  register (func) {
    this.backgroundMode.on('enable').subscribe(function () {
      Observable.interval(10 * 1000).subscribe(x => func );
    });
  }
}
