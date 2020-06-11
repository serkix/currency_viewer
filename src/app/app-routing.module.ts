import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CurrentValuesComponent} from './current-values/current-values.component';
import {HistoryValueComponent} from './history-value/history-value.component';
import { APIConnectorService } from './api-connector.service';

const routes: Routes = [
  { path: 'current-values', component: CurrentValuesComponent },
  { path: 'history-value', component: HistoryValueComponent },
  { path: '**', component: CurrentValuesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
