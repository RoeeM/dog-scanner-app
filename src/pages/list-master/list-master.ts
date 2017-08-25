import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';

import { ItemCreatePage } from '../item-create/item-create';
import { ItemDetailPage } from '../item-detail/item-detail';

import { Items } from '../../providers/providers';

import { Item } from '../../models/item';

import { User } from '../../providers/providers';

import { DogReport } from '../../models/dogreport';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  position: CameraPosition;
  // public lat: any = 51.678418;
  // public lng: any = 7.809007;
  public gm_items: FirebaseListObservable<any>;

  @ViewChild('map') map;

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController,
     public user: User, private googleMaps: GoogleMaps, public db: AngularFireDatabase) {
    this.currentItems = this.items.query();
      this.gm_items = this.db.list('/dogreports');
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  // Load map only after view is initialized
ngAfterViewInit() {
  this.loadMap();
 }

  loadMap() {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
    
      let map: GoogleMap = this.googleMaps.create(element);
      
      // listen to MAP_READY event
      // You must wait for this event to fire before adding something to the map or modifying it in anyway
      map.one(GoogleMapsEvent.MAP_READY).then(
        () => {
          console.log('Map is ready!');
          // Now you can add elements to the map like the marker
        }
      );
      /*
      // create CameraPosition
      let position: CameraPosition = {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      };
    
      // move the map's camera to position
      map.moveCamera(position);
    
      // create new marker
      let markerOptions: MarkerOptions = {
        position: ionic,
        title: 'Ionic'
      };
    
      const marker: Marker = map.addMarker(markerOptions)
        .then((marker: Marker) => {
          marker.showInfoWindow();
        });
      */
    }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }
}
