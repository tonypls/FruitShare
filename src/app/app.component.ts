import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { AngularFire } from 'angularfire2';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage;

  constructor(platform: Platform, af: AngularFire) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.rootPage = HomePage;
        console.log("I'm here! HomePage");
      } else {
        this.rootPage = LoginPage;
        console.log("I'm here! LoginPage");
      }
    });
  }



}
