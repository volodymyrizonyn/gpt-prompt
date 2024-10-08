import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template.component';
import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';
import { AuthGuard } from '@guards';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'my', component: ListComponent, data: { isMy: true }, canActivate: [AuthGuard] },
      { path: ':id', component: DetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateRoutingModule {}
