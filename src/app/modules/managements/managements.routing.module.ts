import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract, AuthenticationGuard } from '@app/core';
import { ManagementsComponent } from './managements.component';

import { Shell } from '@app/modules/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'managements',
      component: ManagementsComponent,
      data: { title: extract('Managements') },
      canActivate: [AuthenticationGuard]
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ManagementsRoutingModule {}
