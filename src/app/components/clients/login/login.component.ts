import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User1Service } from 'src/app/services/demo/user1.service';

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

  loginMessage: string = '';


  constructor(private userService: User1Service, private router: Router) { }

  onChangeEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
    this.validateEmail();
  }

  onChangePassword(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
    this.validatePassword();
  }

  togglePassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  async onSubmit() {
    if (this.validateEmail() && this.validatePassword()) {
      var user = await this.userService.getUserByUsername(this.email);
      if (user) {
        if (user.role_id === 1) {
          this.router.navigate(['/admin/home']);
        } else if (user.role_id === 2) {
          var route = "/partner/" + user.id;
          this.router.navigate([route]);
        }
        else {
          this.router.navigate(['/home']);
        }
      } else {
        this.loginMessage = 'Sai email hoặc mật khẩu';
      }
    } else {
      // Trường hợp các hàm validate trả về false
      this.validateEmail();
      this.validatePassword();
    }
  }



  private validateEmail(): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailPattern.test(this.email);
    this.invalidEmail = !isValidEmail;
    return isValidEmail;
  }

  private validatePassword(): boolean {
    this.invalidPassword = this.password.length < 6;
    return !this.invalidPassword;
  }
}
