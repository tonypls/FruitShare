import {Injectable} from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthData {

  public fireAuth: any;
  public userProfile: any;

  constructor() {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userprofile');
  }

//    Allow existing users with email & password
  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

//    Register new user
  signupUser(email: string, displayName: string, password: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        this.userProfile.child(newUser.uid).set({email: email, displayName: displayName});
      });
  }

//    Send new password to existing user to reset password
  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

//    Logging out the current user
  logoutUser(): any {
    return this.fireAuth.signOut();
  }

  pushTreetoDB(name: string, description: string, fruitType: string, position: any){
    var latitude = position.lat();
    var longitude = position.lng();
    firebase.database().ref('/trees').push({name: name, description: description, fruitType: fruitType, latitude: latitude, longitude: longitude});
  }
}
