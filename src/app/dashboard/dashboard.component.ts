import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActions from '../ingreso-egreso/ingres-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs! : Subscription;
  ingresosSubs!: Subscription;

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {

    this.store.select('user')
    .pipe(
      filter(auth => auth.user != null)
    )
    .subscribe( ({user}) => {
      console.log(user)
      this.ingresosSubs = this.ingresoEgresoService.initIngresosEgresosListener(user!.uid)
      .subscribe(ingresosEgresosFB =>{
        this.store.dispatch( ingresoEgresoActions.setItems({items: ingresosEgresosFB}))
      });
    });
  }

  ngOnDestroy(){

    this.ingresosSubs?.unsubscribe();
    this.userSubs?.unsubscribe();

  }

}
