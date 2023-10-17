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
import { ProfileComponent } from './components/clients/profile/profile.component';
import { LayoutProfileComponent } from './components/clients/layout-profile/layout-profile.component';
import { UserListComponent } from './components/clients/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RefundPictureComponent } from './components/clients/refund-picture/refund-picture.component';
import { OnlyNumbersDirective } from './common/only-numbers.directive';
import { PagePictureRefundComponent } from './components/clients/page-picture-refund/page-picture-refund.component';
import { LayoutAdminComponent } from './components/admin/layout-admin/layout-admin.component';
import { FooterAdminComponent } from './components/admin/footer-admin/footer-admin.component';
import { MenuAdminComponent } from './components/admin/menu-admin/menu-admin.component';
import { NavbarAdminComponent } from './components/admin/navbar-admin/navbar-admin.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { OrderListAdminComponent } from './components/admin/order-list-admin/order-list-admin.component';
import { OrderAcceptAdminComponent } from './components/admin/order-accept-admin/order-accept-admin.component';
import { PartnerProfileComponent } from './components/partners/partner-profile/partner-profile.component';

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
    LayoutProfileComponent,
    UserListComponent,
    RefundPictureComponent,
    OnlyNumbersDirective,
    PagePictureRefundComponent,
    LayoutAdminComponent,
    FooterAdminComponent,
    MenuAdminComponent,
    NavbarAdminComponent,
    HomeAdminComponent,
    OrderListAdminComponent,
    OrderAcceptAdminComponent,
    PartnerProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
