import { Injectable, ElementRef } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICurrency } from '../models/currency';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  currency: ICurrency[] = [];

  usdCursSale!: number;
  euroCursSale!: number;

  usdCursBuy!: number;
  euroCursBuy!: number;


  constructor(public http: HttpClient) { }

  getCurrency(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>('https://api.monobank.ua/bank/currency',)
      .pipe(
        tap((currency) => {
          this.currency = [...this.currency, currency[0], currency[1], currency[82]];
          this.usdCursSale = currency[0].rateSell;
          this.euroCursSale = currency[1].rateBuy;
          this.usdCursBuy = currency[0].rateSell;
          this.euroCursBuy = currency[1].rateBuy;
        })
      )
  }

  convert(firstCurrency: string, secondCurrency: string, firstValue: number, secondInput: ElementRef) {
    if (!firstValue) secondInput.nativeElement.value = '';
    if (firstCurrency === 'usd') {
      if (secondCurrency === 'usd') secondInput.nativeElement.value = firstValue;
      if (secondCurrency === 'euro') secondInput.nativeElement.value = ((this.usdCursBuy / this.euroCursSale) * firstValue).toFixed(2)
      if (secondCurrency === 'uah') secondInput.nativeElement.value = (firstValue * this.usdCursSale).toFixed(2)
    }
    if (firstCurrency === 'euro') {
      if (secondCurrency === 'euro') secondInput.nativeElement.value = firstValue;
      if (secondCurrency === 'usd') secondInput.nativeElement.value = ((+this.euroCursBuy / this.usdCursSale) * firstValue).toFixed(2);
      if (secondCurrency === 'uah') secondInput.nativeElement.value = (firstValue * this.euroCursSale).toFixed(2)
    }
    if (firstCurrency === 'uah') {
      if (secondCurrency === 'uah') secondInput.nativeElement.value = firstValue;
      if (secondCurrency === 'usd') secondInput.nativeElement.value = (firstValue / this.usdCursSale).toFixed(2)
      if (secondCurrency === 'euro') secondInput.nativeElement.value = (firstValue / this.euroCursSale).toFixed(2)
    }
  }
}
