//    import all modules
import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TreeForm } from '../tree-form/tree-form';
import { TreePost } from '../tree-post/tree-post';
import { AuthData } from '../../providers/auth-data';
import { LoadingController } from 'ionic-angular';
import firebase from 'firebase';

declare var google;

@Component({
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers: any = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public authData: AuthData, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }


  loadMap(){
    //    Get user's current location
    Geolocation.getCurrentPosition().then(pos => {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: pos.coords.latitude, lng: pos.coords.longitude},
        zoom: 15
      });

      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push('pac-input');

      this.pullTreesFromDB();
    }).catch(err => {
      console.log(err);
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -40, lng: 174},
        zoom: 6
      });
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('pac-input'));

      this.pullTreesFromDB();
    });
  }

  //   Centralising the current location
  centerOnLocation() {
    var map = this.map;
    Geolocation.getCurrentPosition().then(pos => {
      let currentLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
      map.setCenter(currentLocation);
      map.setZoom(15);
    }).catch(err => {
      console.log(err);
    });
  }

  //    Geocode converts address or landscape names to latitude and longitude
  geocode(locationInput) {
    var geocoder = new google.maps.Geocoder();
    var map = this.map;
    geocoder.geocode({'address': locationInput}, function(results, status) {
      if (status === 'OK') {
        var latlng = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        map.setCenter(latlng);
        map.setZoom(15);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  //    Add a maker to the map
  addMarker(){
    let treeModal = this.modalCtrl.create(TreeForm, {"map" : this.map});
    treeModal.present();

    treeModal.onDidDismiss(data => {
      console.log('MODAL DATA', data);
      this.markers.push(data);
      if (data != null) {
        this.pullTreesFromDB();
      }
    });
  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);

      //this.navCtrl.push(TreePost);
    });
  }

  pullTreesFromDB(){
    let loader = this.loadingCtrl.create({
      content: "Syncing data",
      duration: 500
    });
    loader.present();
    console.log('Pulling trees from db');
    var trees = firebase.database().ref('/trees').orderByKey();
    var fruitIcon = {
      url: 'http://www.freeiconspng.com/uploads/clean-energy-tree-icon-copy-9.png', // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    var map = this.map;
    this.clearMarkers();
    var markerArray = this.markers;

    trees.once('value').then((dataSnapshot) => {
      dataSnapshot.forEach(function (childSnapshot) {
        var name  = childSnapshot.val().name;
        var description = childSnapshot.val().description;
        var fruitType = childSnapshot.val().fruitType;
        var myLatLng = {lat: childSnapshot.val().latitude, lng: childSnapshot.val().longitude};

        var content = 'Name: ' + name + ', Description: ' + description + ', Fruit Type: ' + fruitType;

        console.log(content);
        let marker = new google.maps.Marker({
          map: map,
          id: fruitType,
          icon: fruitIcon,
          animation: google.maps.Animation.DROP,
          position: myLatLng
        });

        markerArray.push(marker);

        let infoWindow = new google.maps.InfoWindow({
        content: content
        });

        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(this.map, marker);
        });

      })
    })
    this.markers = markerArray;
  }

  clearMarkers() {
    for (var i = 0; i < this.markers.length; i++ ) {
      this.markers[i].setMap(null);
    }
    this.markers.length = 0;
  }

  logout(){
    this.authData.logoutUser();
    this.navCtrl.setRoot(LoginPage);
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
