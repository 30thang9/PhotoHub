import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteClient, RouteShop } from './routes/routes.config';
import { LayoutClientComponent } from './components/clients/layout-client/layout-client.component';
import { LayoutShopComponent } from './components/clients/layout-shop/layout-shop.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
