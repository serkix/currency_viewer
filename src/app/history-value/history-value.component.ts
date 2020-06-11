import { APIConnectorService, RatesData } from '../api-connector.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
@Component({
  selector: 'app-history-value',
  templateUrl: './history-value.component.html',
  styleUrls: ['./history-value.component.css']
})
export class HistoryValueComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  data      : RatesData;
  error     : string;
  _startDate: Date = new Date();
  _endDate  : Date = new Date();
  minDate   : Date;
  maxDate   : Date;
  _cur      : string;
  dateError : string = null;
  loading   : boolean = false;
  date_rates: any[] = [];
  displayedColumns: string[] = ['Currency', 'Value'];

  get startDate(): Date {
    return this._startDate;
  }
  set startDate(newVal) {
    this._startDate = newVal;
  }
  get endDate(): Date {
    return this._endDate;
  }
  set endDate(newVal) {
    this._endDate = newVal;
  }

  get cur(): string {
    return this._cur;
  }
  set cur(newVal: string) {
    this._cur = newVal;
  }

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private APIService: APIConnectorService) {
    this.minDate = new Date(1999, 0, 4);
    this.maxDate = new Date();
    this.cur = "EUR";
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    //this.getRates();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  isDateCorrect() {
    return this.dateError == null;
  }

  RefreshInfo() {
    this.getRates();
  }

  choose(currency: string) {
    this.cur = currency;
    this.RefreshInfo();
  }

  getRates() {
    this.loading = true;
    this.APIService.getHistoryRates(this.startDate, this.endDate, this.cur)
      .subscribe({
        next: (data: RatesData) => {
          this.loading = false;
          this.error = null;
          this.data = data;
          this.cur = data.base;
          this.date_rates = Object.keys(data.rates).map( x => { return {date: new Date(x) ,rates: this.data.rates[x]}});
          for (let i in this.date_rates) {
            this.date_rates[i].rates = Object.keys(this.date_rates[i].rates).map ( x => {return {currency: x, value: this.date_rates[i].rates[x]};});
          }
          this.date_rates.sort( (a, b) => {return a.date - b.date;});
        },
        error: err => { this.loading = false; this.error = err.error.error;}
      });
  }
}
