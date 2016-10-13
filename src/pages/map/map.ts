import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
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

    let treeModal = this.modalCtrl.create(TreeForm, {"map" : this.map});
    treeModal.present();

    treeModal.onDidDismiss(data => {
      console.log('MODAL DATA', data);
      this.addInfoWindow(data, 'tree');
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
