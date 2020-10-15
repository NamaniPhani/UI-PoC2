import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpformComponent } from './empform/empform.component';

const routes: Routes = [
  {
    path:'',component:EmpformComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
