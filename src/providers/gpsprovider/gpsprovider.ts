import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';

/*
  Generated class for the GpsproviderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GpsproviderProvider {

  constructor(public http: Http, private geolocation: Geolocation) {  }

  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  calculateETA(coords_a, coords_b) {
    var lat_delta = coords_a.latitude - coords_b.latitude;
    var lng_delta = coords_a.longitude - coords_b.longitude;
    return lat_delta * lat_delta + lng_delta * lng_delta;
  }

  watchGeolocation(coords, max_time, func) {
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      if (!(data instanceof Error))
        if (this.calculateETA(data.coords, coords) < max_time) {
          func();
        }
     });
  }
}
