import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthData } from '../../providers/auth-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public authData: AuthData) {

  }
  logOut(){
    this.authData.logoutUser().then(() => {
//      this.nav.setRoot(LoginPage);
    });
  }
}
