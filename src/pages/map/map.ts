import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Geoposition, GeolocationOptions } from 'ionic-native';
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
/*
This is the javascript code that needs to be integrated for the chat feature - Tony
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
