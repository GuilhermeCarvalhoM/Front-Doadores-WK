import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoadoresComponent } from './doadores/component/doadores/doadores.component';

const routes: Routes = [
  {
    path:"" , component:DoadoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
