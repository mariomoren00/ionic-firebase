import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth) {
  }

  async register(user: User){
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(result => {
      console.log('result', result);
      if(result){
        this.navCtrl.push('LoginPage');
      }
    }).catch(error => {
      console.log('error', error);
    });
  }


}
