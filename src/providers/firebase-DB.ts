import {Injectable} from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class FirebaseDB {

  public database: any;

  constructor() {
    this.database = firebase.database();
  }

  pushTreetoDB(name: string, description: string, fruitType: string, position: any){
    var latitude = position.lat();
    var longitude = position.lng();
    this.database.ref('/trees').push({name: name, description: description, fruitType: fruitType, latitude: latitude, longitude: longitude});
  }
}
