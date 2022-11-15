import { Component, OnInit } from '@angular/core';
import { ConvertService } from 'src/app/services/convert.service';
import { Subscription } from 'rxjs';
import { ICurrency } from 'src/app/models/currency';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public convertService: ConvertService,
    public spinnerService: SpinnerService
  ) { }
  ngOnInit(): void {
    this.spinnerService.open()
    this.convertService.getCurrency().subscribe(() => {
      this.spinnerService.close()
    })
  }

}
