import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path : 'admin',
    loadChildren: './app-layout/app-layout.module#AppLayoutModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './auth/auth.module#AuthModule'

  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'

  },
  {
    path : '',
    redirectTo: '/admin',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  { 
    path: '**', 
    redirectTo: '' 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
