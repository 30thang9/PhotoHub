import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isShowPassword: boolean = false;
  invalidEmail: boolean = false;
  invalidPassword: boolean = false;

  email: string = '';
  password: string = '';

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

  onChangePassword(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
    if (this.password.length < 6) {
      this.invalidPassword = true;
    } else {
      this.invalidPassword = false;
    }
  }
  togglePassword() {
    this.isShowPassword = !this.isShowPassword;
  }
}
