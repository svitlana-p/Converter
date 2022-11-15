import { Injectable, ElementRef } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ICurrency } from '../models/currency';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  currency: ICurrency[] = [];

  usdCursSale!: string;
  euroCursSale!: string;

  usdCursBuy!: string;
  euroCursBuy!: string;


  constructor(public http: HttpClient) { }

  getCurrency(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
      .pipe(
        tap((currency) => {
          this.currency = currency;
          this.usdCursSale = currency[0].sale;
          this.euroCursSale = currency[1].sale;
          this.usdCursBuy = currency[0].buy;
          this.euroCursBuy = currency[1].buy;
        })
      )
  }

  convert(firstCurrency: string, secondCurrency: string, firstValue: number, secondInput: ElementRef) {
    if (!firstValue) return;
    if (firstCurrency === 'usd') {
      if (secondCurrency === 'usd') secondInput.nativeElement.value = firstValue;
      if (secondCurrency === 'euro') secondInput.nativeElement.value = ((+this.usdCursBuy / +this.euroCursSale) * firstValue).toFixed(2)
      if (secondCurrency === 'uah') secondInput.nativeElement.value = (firstValue * +this.usdCursSale).toFixed(2)
    }
    if (firstCurrency === 'euro') {
      if (secondCurrency === 'euro') secondInput.nativeElement.value = firstValue;
      if (secondCurrency === 'usd') secondInput.nativeElement.value = ((+this.euroCursBuy / +this.usdCursSale) * firstValue).toFixed(2);
      if (secondCurrency === 'uah') secondInput.nativeElement.value = (firstValue * +this.euroCursSale).toFixed(2)
    }
    if (firstCurrency === 'uah') {
      if (secondCurrency === 'uah') secondInput.nativeElement.value = firstValue;
      if (secondCurrency === 'usd') secondInput.nativeElement.value = (firstValue / +this.usdCursSale).toFixed(2)
      if (secondCurrency === 'euro') secondInput.nativeElement.value = (firstValue / +this.euroCursSale).toFixed(2)
    }
  }
}
