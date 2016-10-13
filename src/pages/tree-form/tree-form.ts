import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';

declare var google;

@Component({
  templateUrl: 'tree-form.html',
})
export class TreeForm {
  map: any;
  callback: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.map = navParams.get('map');
    this.callback = navParams.get('callback');
  }


  cancel() {
    this.navCtrl.pop(MapPage);
  }

  addTree() {
    let marker = new google.maps.Marker({
      map: this.map.get("map"),
      animation: google.maps.Animation.DROP,
      position: this.map.get("map").getCenter()
    });

    this.navCtrl.pop();
    /*this.callback(marker).then(()=>{
      this.navCtrl.pop();
    });*/
  }

}
