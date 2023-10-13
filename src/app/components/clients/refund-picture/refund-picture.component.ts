import { Component } from '@angular/core';

@Component({
  selector: 'app-refund-picture',
  templateUrl: './refund-picture.component.html',
  styleUrls: ['./refund-picture.component.scss']
})
export class RefundPictureComponent {
  invalidEmail: boolean = false;
  invalidPhone: boolean = false;
  isError: boolean = false;

  email: string = '';
  phone: string = '';

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

  onSubmit() {
    if (this.validateEmail() && this.validatePhone()) {
      // Thực hiện xử lý gửi dữ liệu khi cả email và số điện thoại hợp lệ
      // Ví dụ: this.refundService.submitRefund(this.name, this.email, this.phone);
      this.isError = true;
    } else {
      this.validateEmail();
      this.validatePhone();
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


  closeError() {
    this.isError = false;
  }

}
