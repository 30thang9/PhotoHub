import { Routes } from "@angular/router";
import { HomeComponent } from "../components/clients/home/home.component";
import { ShopComponent } from "../components/clients/shop/shop.component";

export const RouteClient: Routes = [
    { path: '', component: HomeComponent, title: 'Home' },
    { path: 'home', component: HomeComponent, title: 'Home' }
]

export const RouteShop: Routes = [
    { path: '', component: ShopComponent, title: 'Collection' },
    { path: 'all', component: ShopComponent, title: 'Collection' }
]