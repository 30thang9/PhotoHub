import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/clients/header/header.component';
import { FooterComponent } from './components/clients/footer/footer.component';
import { HomeComponent } from './components/clients/home/home.component';
import { LayoutClientComponent } from './components/clients/layout-client/layout-client.component';
import { MenuComponent } from './components/clients/menu/menu.component';
import { LayoutShopComponent } from './components/clients/layout-shop/layout-shop.component';
import { ShopComponent } from './components/clients/shop/shop.component';
import { FilterBarComponent } from './components/clients/filter-bar/filter-bar.component';
import { DatePickerComponent } from './components/clients/date-picker/date-picker.component';
import { FormsModule } from '@angular/forms';
import { LayoutAuthComponent } from './components/clients/layout-auth/layout-auth.component';
import { LoginComponent } from './components/clients/login/login.component';
import { RegisterComponent } from './components/clients/register/register.component';
import { SendContactComponent } from './components/clients/send-contact/send-contact.component';
import { CustomSelectComponent } from './components/clients/custom-select/custom-select.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ProfileComponent } from './components/clients/profile/profile.component';
import { LayoutProfileComponent } from './components/clients/layout-profile/layout-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutClientComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MenuComponent,
    LayoutShopComponent,
    ShopComponent,
    FilterBarComponent,
    DatePickerComponent,
    LayoutAuthComponent,
    LoginComponent,
    RegisterComponent,
    SendContactComponent,
    CustomSelectComponent,
    ProfileComponent,
    LayoutProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
