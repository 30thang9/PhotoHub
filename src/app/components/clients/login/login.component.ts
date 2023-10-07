import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

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


  constructor(private userService: UserService, private router: Router) { }

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

  onSubmit() {
    if (this.validateEmail() && this.validatePassword()) {
      this.userService.getUserByUsername(this.email).subscribe((user: User | null) => {
        if (user) {
          this.userService.getRoles().subscribe((roles: Role[]) => {
            const userRole = roles.find(role => role.id === user.role_id);
            if (userRole) {
              this.loginMessage = `Đăng nhập thành công với vai trò: ${userRole.name}`;
              this.router.navigate(['/home']);
            } else {
              this.loginMessage = 'Vai trò không hợp lệ';
            }
          });
        } else {
          this.loginMessage = 'Sai email hoặc mật khẩu';
        }
      });
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
