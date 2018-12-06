import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  LatLng,
  GoogleMap,
  GoogleMaps,
  GoogleMapsEvent,
  GoogleMapOptions
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  location: LatLng;
  constructor(
    public navCtrl: NavController,
    private geoLocation: Geolocation,
    private platform: Platform
  ) {}

  ionViewDidLoad() {
    let element = this.mapElement.nativeElement;

    this.platform.ready().then(() => {
      this.geoLocation
        .getCurrentPosition()
        .then(loc => {
          this.location = new LatLng(loc.coords.latitude, loc.coords.longitude);
        })
        .then(() => {
          let mapOptions: GoogleMapOptions = {
            camera: {
              target: {
                lat: this.location.lat,
                lng: this.location.lng
              },
              zoom: 18,
              tilt: 30
            }
          };

          this.map = GoogleMaps.create(element, mapOptions);

          this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
            this.map.addMarker({
              title: 'My Marker',
              icon: 'blue',
              animation: 'DROP',
              position: {
                lat: this.location.lat,
                lng: this.location.lng
              }
            });
          });
        });

      });
  }
}
