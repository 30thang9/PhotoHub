import { Component } from '@angular/core';
import { Order1Service } from 'src/app/services/demo/order1.service';

@Component({
  selector: 'app-send-contact',
  templateUrl: './send-contact.component.html',
  styleUrls: ['./send-contact.component.scss']
})
export class SendContactComponent {
  invalidEmail: boolean = false;
  invalidPhone: boolean = false;
  invalidName: boolean = false;
  invalidAddress: boolean = false;

  email: string = '';
  phone: string = '';
  name: string = '';
  address: string = '';
  messageText: string = '';
  isSuccess: boolean = true;

  constructor(private orderService: Order1Service) { }

  onChangeName(event: Event) {
    this.name = (event.target as HTMLInputElement).value;
    this.validateName();
  }

  onChangePhone(event: Event) {
    this.phone = (event.target as HTMLInputElement).value;
    this.validatePhone();
  }

  onChangeEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
    this.validateEmail();
  }
  onChangeAddress(event: Event) {
    this.address = (event.target as HTMLInputElement).value;
    this.validateAddress();
  }

  async onSubmit() {
    if (this.validateName() && this.validatePhone() && this.validateEmail() && this.validateAddress()) {
      const order_idStr = localStorage.getItem('order_id');
      if (order_idStr) {
        const order_id = parseInt(order_idStr, 10);
        var order = await this.orderService.getOrderById(order_id);
        if (order) {
          order.cust_name = this.name;
          order.cust_email = this.email;
          order.cust_phone = this.phone;
          order.address = this.address;
          order.status = "cho_duyet";
          var code = "";
          (await this.orderService.generateUniqueOrderCode()).subscribe((uniqueOrderCode) => {
            code = uniqueOrderCode;
          });
          order.code = code;
          var updatedOrder = await this.orderService.updateOrder(order);
          if (updatedOrder) {
            // Xử lý khi đơn hàng được cập nhật thành công
            this.isSuccess = true;
            this.messageText = "Thành công.";
            window.alert(this.messageText);
          } else {
            // Xử lý khi có lỗi trong quá trình cập nhật đơn hàng
            this.messageText = "Thất bại."
            this.isSuccess = false;
            window.alert(this.messageText);
          }
        } else {
          this.messageText = "Thất bại."
          this.isSuccess = false;
          window.alert(this.messageText);
        }
        localStorage.removeItem('order_id');
      } else {
        this.messageText = "Thất bại."
        this.isSuccess = false;
        window.alert(this.messageText);
      }
    } else {
      this.validateName();
      this.validatePhone();
      this.validateEmail()
      this.validateAddress();
    }
  }

  private validateName(): boolean {
    this.invalidName = this.name.length < 1;
    return !this.invalidName;
  }
  private validateAddress(): boolean {
    this.invalidAddress = this.address.length < 1;
    return !this.invalidAddress;
  }

  private validatePhone(): boolean {
    // Sử dụng biểu thức chính quy để kiểm tra xem 'phone' bắt đầu bằng số 0 và có từ 10 đến 11 chữ số
    const phonePattern = /^0[0-9]{9,10}$/;
    const isValidPhone = phonePattern.test(this.phone);

    this.invalidPhone = !isValidPhone;
    return isValidPhone;
  }

  private validateEmail(): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailPattern.test(this.email);
    this.invalidEmail = !isValidEmail;
    return isValidEmail;
  }
}
