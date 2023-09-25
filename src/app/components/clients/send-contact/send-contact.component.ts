import { Component } from '@angular/core';

@Component({
  selector: 'app-send-contact',
  templateUrl: './send-contact.component.html',
  styleUrls: ['./send-contact.component.scss']
})
export class SendContactComponent {
  isShowPassword: boolean = false;
  invalidEmail: boolean = false;
  invalidPhone: boolean = false;
  invalidName: boolean = false;

  email: string = '';
  phone: string = '';
  name: string = '';

  onChangeName(event: Event) {
    this.name = (event.target as HTMLInputElement).value;
    if (this.name.length < 6) {
      this.invalidName = true;
    } else {
      this.invalidName = false;
    }
  }

  onChangePhone(event: Event) {
    this.phone = (event.target as HTMLInputElement).value;
    if (this.phone.length < 6) {
      this.invalidPhone = true;
    } else {
      this.invalidPhone = false;
    }
  }

  onChangeEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailPattern.test(this.email);
    if (!isValidEmail) {
      this.invalidEmail = true;
    } else {
      this.invalidEmail = false;

    }
  }
}
