import { APIConnectorService, RatesData } from '../api-connector.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-current-values',
  templateUrl: './current-values.component.html',
  styleUrls: ['./current-values.component.css']
})



export class CurrentValuesComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  data      : RatesData;
  error     : string;
  _date     : Date;
  minDate   : Date;
  maxDate   : Date;
  _cur      : string;
  dateError : string = null;
  loading   : boolean = false;
  rates     : any[] = [];

  get date(): Date {
    return this._date;
  }
  set date(newVal) {
    this._date = newVal;
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
    this.getRates();
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
    this.APIService.getRates(this.date, this.cur)
      .subscribe({
        next: (data: RatesData) => {
          this.loading = false;
          this.error = null;
          this.data = data;
          this.date = new Date(data.date);
          this.cur = data.base;
          this.rates = Object.keys(data.rates).map( x => { return {name: x, value: this.data.rates[x]}; }); // Some not very good transformation here. This takes object field and transforms them into map
        },
        error: err => { this.loading = false; this.error = err.error.error;}
      });
  }

}
