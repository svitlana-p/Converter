import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConvertService } from 'src/app/services/convert.service';
import { Subscription } from 'rxjs';

import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  sub!: Subscription;

  constructor(public convertService: ConvertService,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.spinnerService.open();
    this.sub = this.convertService.getCurrency().subscribe(() => {
      this.spinnerService.close();
    })
  }

  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
  }
}
