import { Component, ViewChild, ElementRef } from '@angular/core';
import { ConvertService } from 'src/app/services/convert.service';

@Component({
  selector: 'app-convertation',
  templateUrl: './convertation.component.html',
  styleUrls: ['./convertation.component.css']
})
export class ConvertationComponent {
  currencyFirstValue!: number;
  chosenFirstCurrency!: string;
  chosenSecondCurrency!: string;

  constructor(public convertService: ConvertService) { }

  @ViewChild('textField2', { static: false })
  nameInputRef!: ElementRef;


  onSelect() {
    this.convertService.convert(this.chosenFirstCurrency, this.chosenSecondCurrency, this.currencyFirstValue, this.nameInputRef);
  }

}
