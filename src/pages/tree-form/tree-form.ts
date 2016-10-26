import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';

/*
  Generated class for the TreeForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var google;

@Component({
  selector: 'page-tree-form',
  templateUrl: 'tree-form.html'
})


//class for Tree Modal to query user for name and description for tree post
export class TreeForm {
  public treePostForm;

  constructor(public viewCtrl: ViewController, public params: NavParams, public formBuilder: FormBuilder, public authData: AuthData) {
    this.treePostForm = formBuilder.group({
      treeName: ['', Validators.compose([Validators.required])],
      treeDescription: ['', Validators.compose([Validators.required])],
      FruitType: ['', Validators.compose([Validators.required])]
    });
  }

  //dismisses the modal when cancel button is pressed
  cancel() {
    this.viewCtrl.dismiss();
  }

  //creates a marker which is passed back to the map class
  addTree() {
    if (!this.treePostForm.valid){
      console.log("Form is invalid");
    } else {
      var name = this.treePostForm.value.treeName;
      var description = this.treePostForm.value.treeDescription;
      var fruitType = this.treePostForm.value.FruitType;
      var position = this.params.get("map").getCenter();

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
        position: position
      });

      this.authData.pushTreetoDB(name, description, fruitType, position);
      alert('TEST- Name: ' + name +' Description: '+ description + ' Fruit Type: ' + fruitType);

      this.viewCtrl.dismiss(marker);
    }
  }
}
