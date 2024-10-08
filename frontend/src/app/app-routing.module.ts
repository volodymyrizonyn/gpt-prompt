import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@components';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'signup',
        loadChildren: () => import('./modules/signup/signup.module').then((m) => m.SignupModule),
      },
      {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'pricing',
        loadChildren: () => import('./modules/subscription/subscription.module').then((m) => m.SubscriptionModule),
      },
      {
        path: '',
        loadChildren: () => import('./modules/template/template.module').then((m) => m.TemplateModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
