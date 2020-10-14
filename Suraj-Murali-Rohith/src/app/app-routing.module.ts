import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUsersComponent } from './components/create-users/create-users.component';
import { GetallUsersComponent } from './components/getall-users/getall-users.component';

const routes: Routes = [
  { path: '', component: CreateUsersComponent },
  {
    path: 'getall-user',
    component: GetallUsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
