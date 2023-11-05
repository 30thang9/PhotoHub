import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteAdmin, RouteAuth, RouteClient, RoutePartner, RouteShop, RouteUser } from './routes/routes.config';
import { LayoutClientComponent } from './components/clients/layout-client/layout-client.component';
import { LayoutShopComponent } from './components/clients/layout-shop/layout-shop.component';
import { LayoutAuthComponent } from './components/clients/layout-auth/layout-auth.component';
import { SendContactComponent } from './components/clients/send-contact/send-contact.component';
import { ProfileComponent } from './components/clients/profile/profile.component';
import { LayoutProfileComponent } from './components/clients/layout-profile/layout-profile.component';
import { RefundPictureComponent } from './components/clients/refund-picture/refund-picture.component';
import { PagePictureRefundComponent } from './components/clients/page-picture-refund/page-picture-refund.component';
import { LayoutAdminComponent } from './components/admin/layout-admin/layout-admin.component';
import { Test1Component } from './components/tests/test1/test1.component';
import { WarehousePictureComponent } from './components/partners/warehouse-picture/warehouse-picture.component';
import { WarehouseRepairComponent } from './components/partners/warehouse-repair/warehouse-repair.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutClientComponent,
    children: RouteClient
  },
  {
    path: 'collection',
    component: LayoutShopComponent,
    children: RouteShop
  },
  {
    path: 'auth',
    component: LayoutAuthComponent,
    children: RouteAuth
  },
  {
    path: 'contact',
    component: LayoutAuthComponent,
    children: [{ path: "", component: SendContactComponent, title: "Contact send" }]
  },
  {
    path: 'refund-picture',
    component: LayoutAuthComponent,
    children: [{ path: "", component: RefundPictureComponent, title: "Refund pictures" }]
  },
  {
    path: 'profile/:id',
    component: LayoutProfileComponent,
    children: [{ path: "", component: ProfileComponent, title: "Profile" }]
  },
  {
    path: 'user',
    component: LayoutShopComponent,
    children: RouteUser
  },
  {
    path: 'refund-pc/:id',
    component: PagePictureRefundComponent,
  },
  {
    path: 'partner/:id',
    component: LayoutProfileComponent,
    children: RoutePartner
  },
  {
    path: 'ware-house-picture/:id',
    component: WarehousePictureComponent,
  },
  {
    path: 'ware-house-repair/:id',
    component: WarehouseRepairComponent,
  },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    children: RouteAdmin
  }
  ,
  {
    path: 'test',
    component: Test1Component,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
