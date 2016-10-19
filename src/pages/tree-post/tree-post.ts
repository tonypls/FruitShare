import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the TreePost page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tree-post',
  templateUrl: 'tree-post.html'
})
export class TreePost {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello TreePost Page');
  }

}
