import { Routes } from "@angular/router";
import { HomeComponent } from "../components/clients/home/home.component";
import { ShopComponent } from "../components/clients/shop/shop.component";
import { LoginComponent } from "../components/clients/login/login.component";
import { RegisterComponent } from "../components/clients/register/register.component";
import { UserListComponent } from "../components/clients/user-list/user-list.component";
import { HomeAdminComponent } from "../components/admin/home-admin/home-admin.component";
import { OrderListAdminComponent } from "../components/admin/order-list-admin/order-list-admin.component";
import { OrderAcceptAdminComponent } from "../components/admin/order-accept-admin/order-accept-admin.component";
import { PartnerProfileComponent } from "../components/partners/partner-profile/partner-profile.component";

export const RouteClient: Routes = [
    { path: '', component: HomeComponent, title: 'Home' },
    { path: 'home', component: HomeComponent, title: 'Home' }
]

export const RouteShop: Routes = [
    { path: '', component: ShopComponent, title: 'Collection' },
    { path: 'all', component: ShopComponent, title: 'Collection' },

]

export const RouteAuth: Routes = [
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'register', component: RegisterComponent, title: 'Register' },
]

export const RouteUser: Routes = [
    { path: '', component: UserListComponent, title: 'User' },
    { path: 'all', component: UserListComponent, title: 'User' },
]

export const RoutePartner: Routes = [
    { path: '', component: PartnerProfileComponent, title: 'Partner | Profile' },
]

export const RouteAdmin: Routes = [
    { path: '', component: HomeAdminComponent, title: 'Admin | Home' },
    { path: 'home', component: HomeAdminComponent, title: 'Admin | Home' },
    { path: 'order', component: OrderListAdminComponent, title: 'Admin | Order List' },
    { path: 'order-accept', component: OrderAcceptAdminComponent, title: 'Admin | Order Accept' },
]
