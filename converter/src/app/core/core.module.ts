import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ConvertationComponent } from './components/convertation/convertation.component';
import { FormsModule } from '@angular/forms';
import { share } from 'rxjs';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HeaderComponent,
    ConvertationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ], 
  exports: [
    HeaderComponent, ConvertationComponent
  ]
})
export class CoreModule { }
