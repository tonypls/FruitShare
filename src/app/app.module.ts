import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

// Import AngularFire
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2'

// Import pages
import { MapPage } from '../pages/map/map';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { TreeForm } from '../pages/tree-form/tree-form';

// Import providers
import { AuthData } from '../providers/auth-data';

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
    MapPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    TreeForm
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    TreeForm
  ],
  providers: [
    AuthData,
  ]
})
export class AppModule {}
