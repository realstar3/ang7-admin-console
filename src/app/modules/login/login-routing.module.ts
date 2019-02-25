import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { LoginComponent } from './login.component';
import { ForgotComponent, SignupComponent } from './components';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: extract('Login') } },
  { path: 'forgot', component: ForgotComponent, data: { title: extract('Forgot') } },
  { path: 'signup', component: SignupComponent, data: { title: extract('Sign up') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LoginRoutingModule {}
