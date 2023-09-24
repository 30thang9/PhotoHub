import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteAuth, RouteClient, RouteShop } from './routes/routes.config';
import { LayoutClientComponent } from './components/clients/layout-client/layout-client.component';
import { LayoutShopComponent } from './components/clients/layout-shop/layout-shop.component';
import { LayoutAuthComponent } from './components/clients/layout-auth/layout-auth.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutClientComponent,
    children: RouteClient
  }
  ,
  {
    path: 'collection',
    component: LayoutShopComponent,
    children: RouteShop
  }
  ,
  {
    path: 'auth',
    component: LayoutAuthComponent,
    children: RouteAuth
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
