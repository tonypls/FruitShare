import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { MapPage } from '../pages/map/map';
import { LoginPage } from '../pages/login/login';

import { AngularFire } from 'angularfire2';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform, af: AngularFire) {

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });

//    Code to direct to login page if user isnt logged in
//    and direct to map page if user is logged in.
//    firebase.auth().onAuthStateChanged((user) => {
//      if (user) {
//        this.rootPage = MapPage;
//        console.log("User is logged in. Direct to MapPage");
//      } else {
//        this.rootPage = LoginPage;
//        console.log("User isn't logged in. Direct to LoginPage");
//      }
//    });


  }
}
