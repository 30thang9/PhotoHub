import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteAuth, RouteClient, RouteShop, RouteUser } from './routes/routes.config';
import { LayoutClientComponent } from './components/clients/layout-client/layout-client.component';
import { LayoutShopComponent } from './components/clients/layout-shop/layout-shop.component';
import { LayoutAuthComponent } from './components/clients/layout-auth/layout-auth.component';
import { SendContactComponent } from './components/clients/send-contact/send-contact.component';
import { ProfileComponent } from './components/clients/profile/profile.component';
import { LayoutProfileComponent } from './components/clients/layout-profile/layout-profile.component';
import { RefundPictureComponent } from './components/clients/refund-picture/refund-picture.component';
import { PagePictureRefundComponent } from './components/clients/page-picture-refund/page-picture-refund.component';

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
  ,
  {
    path: 'contact',
    component: LayoutAuthComponent,
    children: [{ path: "", component: SendContactComponent, title: "Contact send" }]
  }
  ,
  {
    path: 'refund-picture',
    component: LayoutAuthComponent,
    children: [{ path: "", component: RefundPictureComponent, title: "Refund pictures" }]
  }
  ,
  {
    path: 'profile/:id',
    component: LayoutProfileComponent,
    children: [{ path: "", component: ProfileComponent, title: "Profile" }]
  }
  ,
  {
    path: 'user',
    component: LayoutShopComponent,
    children: RouteUser
  }
  ,
  {
    path: 'refund-pc',
    component: PagePictureRefundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
