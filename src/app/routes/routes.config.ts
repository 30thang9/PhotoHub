import { Routes } from "@angular/router";
import { HomeComponent } from "../components/clients/home/home.component";
import { ShopComponent } from "../components/clients/shop/shop.component";
import { LoginComponent } from "../components/clients/login/login.component";
import { RegisterComponent } from "../components/clients/register/register.component";
import { SendContactComponent } from "../components/clients/send-contact/send-contact.component";

export const RouteClient: Routes = [
    { path: '', component: HomeComponent, title: 'Home' },
    { path: 'home', component: HomeComponent, title: 'Home' }
]

export const RouteShop: Routes = [
    { path: '', component: ShopComponent, title: 'Collection' },
    { path: 'all', component: ShopComponent, title: 'Collection' }
]

export const RouteAuth: Routes = [
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'register', component: RegisterComponent, title: 'Register' },
    { path: 'contact-send', component: SendContactComponent, title: 'Send the contact' }
]