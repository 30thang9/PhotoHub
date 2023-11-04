import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserInfo } from 'src/app/models/userInfo.model';
import { UserInfo1Service } from 'src/app/services/demo/user-info1.service';
import { User1Service } from 'src/app/services/demo/user1.service';
import { v4 as uuidv4 } from 'uuid';

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
  invalidExp: boolean = false;
  invalidAvatar: boolean = false;
  invalidPicture: boolean = false;
  invalidCost: boolean = false;
  invalidAddress: boolean = false;

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  fullName: string = '';
  exp: string = '';
  cost: string = '';
  address: string = '';

  registerMessage: string = '';


  constructor(private userService: User1Service,
    private userInfoService: UserInfo1Service,
    private router: Router,
    private fileStorage: AngularFireStorage) { }

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
  onChangeExp(event: Event) {
    this.exp = (event.target as HTMLInputElement).value;
    this.validateExp();
  }
  onChangeCost(event: Event) {
    this.cost = (event.target as HTMLInputElement).value;
    this.validateExp();
  }
  onChangeAddress(event: Event) {
    this.address = (event.target as HTMLInputElement).value;
    this.validateExp();
  }

  togglePassword() {
    this.isShowPassword = !this.isShowPassword;
  }
  toggleConfirmPassword() {
    this.isShowConfirmPassword = !this.isShowConfirmPassword;
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
  private validateCost(): boolean {
    this.invalidCost = this.cost.length < 1;
    return !this.invalidCost;
  }
  private validateAddress(): boolean {
    this.invalidAddress = this.address.length < 1;
    return !this.invalidAddress;
  }

  private validateExp(): boolean {
    const expPattern = /^\d+$/;
    const invalidExp = expPattern.test(this.exp);
    this.invalidExp = !invalidExp;
    return invalidExp;
  }


  filesAddAvatar: File[] = [];
  avatarPreview: string[] = [];

  previewAvatar(event: any) {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length > 0) {
      this.filesAddAvatar = Array.from(files).slice(0, 1);
      this.avatarPreview = []; // Clear the previous previews

      for (let i = 0; i < this.filesAddAvatar.length; i++) {
        const file = this.filesAddAvatar[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          this.avatarPreview.push(e.target?.result as string);
        };

        reader.readAsDataURL(file);
      }
    } else {
      this.avatarPreview = [];
    }
    this.validateAvatar();
  }

  filesAddPicture: File[] = [];
  picturePreview: string[] = [];

  previewPicture(event: any) {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length > 0) {
      const remainingSlots = 3 - this.filesAddPicture.length;

      if (remainingSlots > 0) {
        const filesToAdd = Array.from(files).slice(0, remainingSlots);
        this.filesAddPicture.push(...filesToAdd);
      }

      this.picturePreview = [];

      for (let i = 0; i < this.filesAddPicture.length; i++) {
        const file = this.filesAddPicture[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          this.picturePreview.push(e.target?.result as string);
        };

        reader.readAsDataURL(file);
      }
    } else {
      this.picturePreview = [];
    }
    this.validatePicture();
  }


  deletePicture(index: number) {
    if (index >= 0 && index < this.picturePreview.length) {
      this.picturePreview.splice(index, 1);
      this.filesAddPicture.splice(index, 1);
    }
  }

  async onSubmit() {
    if (
      this.validateEmail() &&
      this.validatePassword() &&
      this.validateConfirmPassword() &&
      this.validateFullName() &&
      this.validateExp() &&
      this.validateAvatar() &&
      this.validatePicture() &&
      this.validateCost() &&
      this.validateAddress()
    ) {
      var isUnique = await this.userService.isUsernameUnique(this.email);
      if (!isUnique) {
        this.registerMessage = 'Người dùng đã tồn tại.';
        window.alert(this.registerMessage);
      } else {
        var urlsAvatar = await this.uploadAvatar();
        const newUser: User = {
          id: 0,
          username: this.email,
          password: this.password,
          full_name: this.fullName,
          role_id: 2,
          email: '',
          phone_number: '',
          address: this.address,
          avatar: urlsAvatar[0],
          exp: parseFloat(this.exp)
        };

        var user = await this.userService.createUser(newUser);

        if (user != null) {
          var urlsPicture = await this.uploadPicture();
          var costNum: number = parseFloat(this.cost);
          const newUserInfo: UserInfo = {
            id: 0,
            user_id: user.id,
            img1: urlsPicture[0] || "",
            img2: urlsPicture[1] || "",
            img3: urlsPicture[2] || "",
            cost: costNum,
            description: "Tôi đã chụp ảnh cả đời nhưng quyết định chụp ảnh chuyên nghiệp vào năm 2010 và tôi càng yêu thích nó hơn mỗi ngày. Tôi rất là người của mọi người nhưng trớ trêu thay chuyên môn của tôi lại là chụp ảnh sản phẩm, đồ ăn và đồ uống. Chỉ vì tôi chuyên chụp đồ không có nghĩa là tôi thiếu chụp ảnh chân dung, thứ duy nhất tôi không chụp là đám cưới ;)",
            prize: "Nhiếp ảnh gia tài năng khu vực miền Bắc năm 2023",
            interest: "Tôi bị ám ảnh bởi máy ảnh từ khi lên 3 và mẹ tôi đã cho tôi chơi với máy ảnh Polaroid :)",
            language: "Tiếng Việt",
            camera: "Sony A7iii, LUMIX G9, Panasonic GH5",
            portfolio: [],
            typeOfPhoto: [
              {
                id: 1,
                name: "Chụp chân dung",
                cost: "500000"
              },
              {
                id: 2,
                name: "Chụp sản phẩm",
                cost: "400000"
              },
              {
                id: 3,
                name: "Chụp cảnh",
                cost: "300000"
              },
              {
                id: 4,
                name: "Chụp sự kiện",
                cost: "800000"
              },
              {
                id: 5,
                name: "Chụp beauty",
                cost: "550000"
              }
            ]
          }
          var userInfo = await this.userInfoService.createUserInfo(newUserInfo);
          if (userInfo) {
            this.registerMessage = 'Thêm người dùng thành công.';
            window.alert(this.registerMessage);
            this.router.navigate(['/auth/login']);
          } else {
            this.registerMessage = 'Thêm thông tin không thành công.';
            window.alert(this.registerMessage);
          }
        } else {
          this.registerMessage = 'Thêm người dùng không thành công.';
          window.alert(this.registerMessage);
        }

      }
    } else {
      // Trường hợp các hàm validate trả về false
      this.validateEmail();
      this.validateFullName();
      this.validatePassword();
      this.validateConfirmPassword();
      this.validateExp();
      this.validateAvatar();
      this.validatePicture();
      this.validateCost();
      this.validateAddress();
    }
  }

  async uploadAvatar() {
    var urls: string[] = [];
    var renamedFiles: File[] = [];

    for (let i = 0; i < this.filesAddAvatar.length; i++) {
      const file = this.filesAddAvatar[i];
      const fileExtension = file.name.split('.').pop();
      const newFileName = uuidv4() + '.' + fileExtension;

      renamedFiles.push(new File([file], newFileName, { type: file.type }));
    }

    for (let i = 0; i < renamedFiles.length; i++) {
      const file = renamedFiles[i];
      const path = `avatar/${file.name}`;
      const uploadTask = await this.fileStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      urls.push(url);
    }
    return urls;
  }

  async uploadPicture() {
    var urls: string[] = [];
    var renamedFiles: File[] = [];

    for (let i = 0; i < this.filesAddPicture.length; i++) {
      const file = this.filesAddPicture[i];
      const fileExtension = file.name.split('.').pop();
      const newFileName = uuidv4() + '.' + fileExtension;

      renamedFiles.push(new File([file], newFileName, { type: file.type }));
    }

    for (let i = 0; i < renamedFiles.length; i++) {
      const file = renamedFiles[i];
      const path = `bias/${file.name}`;
      const uploadTask = await this.fileStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      urls.push(url);
    }
    return urls;
  }


  private validateAvatar(): boolean {
    this.invalidAvatar = this.filesAddAvatar.length < 1;
    return !this.invalidAvatar;
  }
  private validatePicture(): boolean {
    this.invalidPicture = this.filesAddPicture.length !== 3;
    return !this.invalidPicture;
  }

}

