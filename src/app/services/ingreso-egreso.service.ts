import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore,
              private auhtService: AuthService) { }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ){
    const uid = this.auhtService.user!.uid;

    delete ingresoEgreso.uid;

    return this.firestore.doc(`${uid}/ingresos-egresos`)
    .collection('items')
    .add({...ingresoEgreso});

  }


  initIngresosEgresosListener( uid: string){

  return this.firestore.collection(`${uid}/ingresos-egresos/items`)
  .snapshotChanges()
  .pipe(
    map(snapshot =>{
      return snapshot.map( doc =>{
        const data:any = doc.payload.doc.data();
        return {
          uid: doc.payload.doc.id,
          ...data
        }
      })
    })
  );
  }

  borrarIngresoEgreso(uidItem:string){
    const uid = this.auhtService.user!.uid;
    return this.firestore.doc(`${uid}/ingresos-egresos/items/${uidItem}`).delete()

  }

}
