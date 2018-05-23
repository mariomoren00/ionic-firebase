import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private googlePlus: GooglePlus ) {
  }

  async login(user: User){
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(result => {
      console.log('result', result);
      if(result){
        //debemos pasar el result, en este caso es el objeto cuando hace login 
        //para mostrar el nombre y correo del usuario
        this.navCtrl.push('HomePage');
      }
    }).catch(error => {
      console.log('error', error);
    });
  }

  register(){
    this.navCtrl.push('RegisterPage');
  }


  google(){
    this.googlePlus.login({
      'webClientId' : '204200343729-g03iu7mfdaimhcsh63d32abk5orbcvk7.apps.googleusercontent.com',
      'offline' : true
    }).then(result => {
      //this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(result.idToken))
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(result.idToken))
      .then(succes => {
        console.log('login', succes);
        if(succes){
          //debemos pasar el succes, en este caso es el objeto cuando hace login 
        //para mostrar el nombre y correo del usuario
        //de la misma forma que en login
          this.navCtrl.push('HomePage');
        }
      })
      .catch(error => {
        console.log('error login', error);
      });
    }).catch(error => {
      console.log(error);
    });
  }

}
