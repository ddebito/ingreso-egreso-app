import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.models';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: Auth,
              public aungularAuth: AngularFireAuth,
              public firestore: AngularFirestore) { }

  crearUsuario(nombre:string, email:string, password:string){
    //console.log(nombre);
    return createUserWithEmailAndPassword(this.auth,email, password)
    .then(({user}) => {

      const newUser = new Usuario( user.uid, nombre, email);

      return this.firestore.doc(`${user.uid}/usuario`).set({...newUser});
    });
  }

  loginUsuario(email:string, password:string){
    return this.aungularAuth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.aungularAuth.signOut();
  }

  initAuthListener(){
    this.aungularAuth.authState.subscribe(fuser =>
      {console.log(fuser),
        console.log(fuser?.uid),
        console.log(fuser?.email)
      })
  }

  isAuth(){
    return this.aungularAuth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }



}
