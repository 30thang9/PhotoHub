import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order1Service } from 'src/app/services/demo/order1.service';

@Component({
  selector: 'app-refund-picture',
  templateUrl: './refund-picture.component.html',
  styleUrls: ['./refund-picture.component.scss']
})
export class RefundPictureComponent {
  invalidEmail: boolean = false;
  invalidPhone: boolean = false;
  invalidCode: boolean = false;
  isError: boolean = false;

  email: string = '';
  phone: string = '';
  code: string = '';

  constructor(private orderService: Order1Service,
    private router: Router) { }

  onChangePhone(event: Event) {
    let inputPhone = (event.target as HTMLInputElement).value;
    inputPhone = inputPhone.replace(/[^0-9]/g, '');
    this.phone = inputPhone;
    this.validatePhone();
  }

  onChangeEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
    this.validateEmail();
  }
  onChangeCode(event: Event) {
    this.code = (event.target as HTMLInputElement).value;
    this.validateCode();
  }

  async onSubmit() {
    if (this.validateEmail() && this.validatePhone() && this.validateCode()) {
      const order = await this.orderService.getOrderByCode(this.code);
      if (order) {
        var route = '/refund-pc/' + order.id;
        window.alert('true');
        this.router.navigate([route]);
      } else {

        this.isError = true;
      }
    } else {
      this.validateEmail();
      this.validatePhone();
      this.validateCode();
    }
  }

  private validateEmail(): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailPattern.test(this.email);
    this.invalidEmail = !isValidEmail;
    return isValidEmail;
  }

  private validatePhone(): boolean {
    // Sử dụng biểu thức chính quy để kiểm tra xem 'phone' bắt đầu bằng số 0 và có từ 10 đến 11 chữ số
    const phonePattern = /^0[0-9]{9,10}$/;
    const isValidPhone = phonePattern.test(this.phone);

    this.invalidPhone = !isValidPhone;
    return isValidPhone;
  }
  private validateCode(): boolean {
    const isValidCode = this.code.length === 6;

    this.invalidCode = !isValidCode;
    return isValidCode;
  }


  closeError() {
    this.isError = false;
  }

}
