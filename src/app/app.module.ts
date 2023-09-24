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
    DatePickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
