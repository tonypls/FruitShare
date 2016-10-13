import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

/*
  Generated class for the TreeForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tree-form',
  templateUrl: 'tree-form.html'
})
//class for Tree Modal to query user for name and description for tree post
export class TreeForm {
  constructor(public viewCtrl: ViewController, public params: NavParams) {
  }

  //dismisses the modal when cancel button is pressed
  cancel() {
    this.viewCtrl.dismiss();
  }

  //creates a marker which is passed back to the map class
  addTree() {
    var fruitIcon = {
      url: 'http://www.freeiconspng.com/uploads/clean-energy-tree-icon-copy-9.png', // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    let marker = new google.maps.Marker({
      map: this.params.get("map"),
      icon: fruitIcon,
      animation: google.maps.Animation.DROP,
      position: this.params.get("map").getCenter()
    });

    this.viewCtrl.dismiss(marker);
  }

}
