import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2'

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCddCnyk5LBaBQtvkslgmvMLVYL_46HwWQ",
  authDomain: "fruit-share-1474847572914.firebaseapp.com",
  databaseURL: "https://fruit-share-1474847572914.firebaseio.com",
  storageBucket: "fruit-share-1474847572914.appspot.com",
  messagingSenderId: "81717061829"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: []
})
export class AppModule {}
