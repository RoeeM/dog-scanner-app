import { Component, ViewChild, NgModule } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, ViewController } from 'ionic-angular';
import { GpsproviderProvider } from './../../providers/gpsprovider/gpsprovider';

import { Camera } from '@ionic-native/camera';


@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  // The Dog report fields to send to the db.
  dog_report: { name: string, about: string, stay_in_touch_phone_numer: string, stay_near_dog: boolean,
     dog_location_latitude: number, dog_location_longitude: number, dog_picture_base64:string } = {
    name: '',
    about: '',
    stay_in_touch_phone_numer: '',
    stay_near_dog: false,
    dog_location_latitude: 0,
    dog_location_longitude: 0,
    dog_picture_base64: ''
  };

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, private gps: GpsproviderProvider) {
    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      about: [''],
      stay_in_touch: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    this.dog_report.name = this.form.controls['name'].value;
    this.dog_report.about = this.form.controls['about'].value;
    this.dog_report.stay_in_touch_phone_numer = this.form.controls['stay_in_touch'].value;
    this.dog_report.dog_picture_base64 = this.form.controls['profilePic'].value;
    // todo: Need to fix the next line to send stay_near_dog_checkbox to db
    //this.dog_report.stay_near_dog = this.form.controls['stay_near_dog_checkbox'].value
    this.gps.getGeolocation(this.send.bind(this));

    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }

  send(latitude, longitude) {
    this.dog_report.dog_location_latitude = latitude;
    this.dog_report.dog_location_longitude = longitude;

    // todo: send all the details (this.dog_report) to the db??
    console.log(this.dog_report);
    }
}
