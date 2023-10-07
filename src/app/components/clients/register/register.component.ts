import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isShowPassword: boolean = false;
  isShowConfirmPassword: boolean = false;
  invalidEmail: boolean = false;
  invalidPassword: boolean = false;
  invalidConfirmPassword: boolean = false;
  invalidFullName: boolean = false;

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  fullName: string = '';

  registerMessage: string = '';


  constructor(private userService: UserService, private router: Router) { }

  onChangeEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
    this.validateEmail();
  }

  onChangePassword(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
    this.validatePassword();
    if (this.confirmPassword.length > 0) {
      this.validateConfirmPassword();
    }
  }
  onChangeConfirmPassword(event: Event) {
    this.confirmPassword = (event.target as HTMLInputElement).value;
    this.validateConfirmPassword();
  }
  onChangeFullName(event: Event) {
    this.fullName = (event.target as HTMLInputElement).value;
    this.validateFullName();
  }

  togglePassword() {
    this.isShowPassword = !this.isShowPassword;
  }
  toggleConfirmPassword() {
    this.isShowConfirmPassword = !this.isShowConfirmPassword;
  }

  onSubmit() {
    if (
      this.validateEmail() &&
      this.validatePassword() &&
      this.validateConfirmPassword() &&
      this.validateFullName()
    ) {
      this.userService.isUsernameExists(this.email).subscribe(
        (usernameExists) => {
          if (usernameExists) {
            this.registerMessage = 'Người dùng đã tồn tại.';
          } else {
            const newUser: User = {
              id: 0,
              username: this.email,
              password: this.password,
              full_name: this.fullName,
              role_id: 3,
              email: '',
              phone_number: '',
              address: '',
              avatar: ''
            };
            this.userService.addUser(newUser).subscribe(
              (user) => {
                if (user !== null) {
                  this.registerMessage = 'Thêm người dùng thành công.';
                  this.router.navigate(['/auth/login']);
                } else {
                  this.registerMessage = 'Thêm người dùng không thành công.';
                }
              },
              (error) => {
                console.error('Lỗi khi thêm người dùng:', error);
                this.registerMessage = 'Đã xảy ra lỗi khi thêm người dùng.';
              }
            );
          }
        });
    } else {
      // Trường hợp các hàm validate trả về false
      this.validateEmail();
      this.validateFullName();
      this.validatePassword();
      this.validateConfirmPassword();
    }
  }



  private validateEmail(): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailPattern.test(this.email);
    this.invalidEmail = !isValidEmail;
    return isValidEmail;
  }

  private validateFullName(): boolean {
    this.invalidFullName = this.fullName.length < 1;
    return !this.invalidFullName;
  }

  private validatePassword(): boolean {
    this.invalidPassword = this.password.length < 6;
    return !this.invalidPassword;
  }

  private validateConfirmPassword(): boolean {
    this.invalidConfirmPassword = this.confirmPassword.length < 6 || this.confirmPassword !== this.password;
    return !this.invalidConfirmPassword;
  }
}

