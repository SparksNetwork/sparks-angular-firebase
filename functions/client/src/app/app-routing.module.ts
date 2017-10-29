import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './features/auth/auth.module#AuthModule'
  },
  {
    path: 'organize',
    loadChildren: './features/organize/organize.module#OrganizeModule'
  },
  {
    path: '',
    loadChildren: './features/appbar/appbar.module#AppbarModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
