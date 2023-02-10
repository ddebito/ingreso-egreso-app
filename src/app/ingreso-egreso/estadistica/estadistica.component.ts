import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  ingresos:number = 0;
  egresos:number = 0;
  totalIngresos:number = 0;
  totalEgresos:number = 0;

  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ ] }

    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
    .subscribe(({items}) => this.generarEstadísitca(items))
  }


  generarEstadísitca(items:IngresoEgreso[]| null){

    this.ingresos= 0;
    this.egresos = 0;
    this.totalIngresos = 0;
    this.totalEgresos = 0;

    for (const item of items!) {
      if(item.tipo ==='ingreso'){
        this.totalIngresos += item.monto;
        this.ingresos++;
      }else{
        this.totalEgresos += item.monto;
        this.egresos++;
      }

    }

    this.doughnutChartData.datasets = [{
      data: [this.totalIngresos, this.totalEgresos]
    }];

  }

}

