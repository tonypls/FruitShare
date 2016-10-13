import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Geoposition, GeolocationOptions } from 'ionic-native/dist/plugins/geolocation';
import { ModalController, ViewController } from 'ionic-angular';
import { TreeForm } from '../tree-form/tree-form';

declare var google;

@Component({
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.marker = navParams.get('marker');
  }

  ionViewLoaded() {
    this.loadMap();
  }


  loadMap(){

    Geolocation.getCurrentPosition().then(pos => {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: pos.coords.latitude, lng: pos.coords.longitude},
        zoom: 15
      });
    }).catch(err => {
      console.log(err);
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -40, lng: 174},
        zoom: 6
      });

    });

  }

  addMarker(){
      this.navCtrl.push(TreeForm, {map: this.map, callback: this.getTreePost});
      this.addInfoWindow(this.marker, 'tree');
 }

 getTreePost = function(_params) {
     return new Promise((resolve, reject) => {
             this.marker = _params;
             resolve();
         });
 }

 addInfoWindow(marker, content){
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
  }

}
