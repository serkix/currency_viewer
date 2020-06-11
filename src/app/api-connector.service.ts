import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class APIConnectorService {
  mainUrl = 'https://api.exchangeratesapi.io/';
  latestURL = 'latest';
  historyURL = 'history';
  loading: boolean = false;

  constructor(private http: HttpClient) {
  }

  getISODate(jsDate: Date) {
    let month = jsDate.getMonth() + 1;
    return jsDate.getFullYear()	+ "-" + month + "-" + jsDate.getDate();
  }

  getHistoryRates(rateStartDate: Date,rateEndDate: Date, rateBase: string) {
    let url = this.mainUrl + this.historyURL + '?';

    url += 'start_at='  + this.getISODate(rateStartDate ) + '&';
    url += 'end_at='    + this.getISODate(rateEndDate   );

    if (rateBase != null) {
      url += "&base=" + rateBase;
    }

    return this.makeRequest(url);
  }

  getRates(rateDate: Date, rateBase: string) {
    let url = this.mainUrl;

    if (rateDate == null) {
      url += this.latestURL;
    } else {
      url += this.getISODate(rateDate);
    }
    if (rateBase != null) {
      url += "?base=" + rateBase;
    }

    return this.makeRequest(url);
  }

  makeRequest(url: string) {
    this.loading = true;
    let obs = this.http.get(url);
    obs.subscribe(
      {complete: () => {this.loading = false; }}
    );
    return obs;
  }
}
export interface RatesData {
  base: string;
  date: string;
  rates: any;
}
