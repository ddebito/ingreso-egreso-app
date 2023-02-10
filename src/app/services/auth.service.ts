import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import * as ingresoEgresoActions from '../ingreso-egreso/ingres-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription! : Subscription;
  private _user!: Usuario|null;

  get user(){
    return this._user;
  }

  constructor(public auth: Auth,
              public aungularAuth: AngularFireAuth,
              public firestore: AngularFirestore,
              private store: Store) { }

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
    this.aungularAuth.authState.subscribe(fuser =>{

      if (fuser)
      {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe( (firestorUser: any) =>{
          const user = Usuario.fromFirebase(firestorUser);
          this._user = user;
          this.store.dispatch(authActions.setUser({user}));

        }) ;

      }
      else{
        this._user = null;
        this.userSubscription?.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(ingresoEgresoActions.unSetItems());
      }

      });
  }

  isAuth(){
    return this.aungularAuth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }



}
