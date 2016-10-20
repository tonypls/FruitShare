import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { ModalController } from 'ionic-angular';
import { TreeForm } from '../tree-form/tree-form';
import { TreePost } from '../tree-post/tree-post';

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

  centerOnLocation() {
    var map = this.map;
    Geolocation.getCurrentPosition().then(pos => {
      let currentLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
      map.setCenter(currentLocation);

    }).catch(err => {
      console.log(err);
    });
  }

  geocode(locationInput) {
    var geocoder = new google.maps.Geocoder();
    var map = this.map;
    geocoder.geocode({'address': locationInput}, function(results, status) {
      if (status === 'OK') {
        var latlng = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        map.setCenter(latlng);
        map.setZoom(10);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
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
      //infoWindow.open(this.map, marker);
      this.navCtrl.push(TreePost);
    });
  }
  /*
   This is the javascript code that needs to be integrated for the chat feature - Tony xD
   import {Page} from 'ionic/ionic';
   import {Http} from "angular2/http";
   import {NgZone} from "angular2/core";

   @Page({
       templateUrl: 'build/pages/home/home.html',
   })

   export class HomePage {
       constructor(http: Http) {
           this.messages = [];
           this.socketHost = "http://192.168.57.1:3000";
           this.zone = new NgZone({enableLongStackTrace: false});
           http.get(this.socketHost + "/fetch").subscribe((success) => {
               var data = success.json();
               for(var i = 0; i < data.length; i++) {
                   this.messages.push(data[i].message);
               }
           }, (error) => {
               console.log(JSON.stringify(error));
           });
           this.chatBox = "";
           this.socket = io(this.socketHost);
           this.socket.on("chat_message", (msg) => {
               this.zone.run(() => {
                   this.messages.push(msg);
               });
           });
       }

       send(message) {
           if(message && message != "") {
               this.socket.emit("chat_message", message);
           }
           this.chatBox = "";
       }
   } */

}
