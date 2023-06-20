import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoadoresComponent } from './component/doadores/doadores.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [DoadoresComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [DoadoresComponent],
})
export class DoadoresModule {}
