import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Deces } from 'src/app/models/deces.model';
import { Order } from 'src/app/models/order.model';
import { UserInfoDTO } from 'src/app/models/userInfoDTO.model';
import { Deces1Service } from 'src/app/services/demo/deces1.service';
import { Order1Service } from 'src/app/services/demo/order1.service';
import { UserInfoDTO1Service } from 'src/app/services/demo/user-info-dto1.service';
import { UserInfo1Service } from 'src/app/services/demo/user-info1.service';
import { User1Service } from 'src/app/services/demo/user1.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Category } from 'src/app/models/category.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-partner-profile',
  templateUrl: './partner-profile.component.html',
  styleUrls: ['./partner-profile.component.scss']
})
export class PartnerProfileComponent implements OnInit {
  userData: UserInfoDTO | null = null;
  decesData: Deces | null = null;
  selectedDateU: string = '';
  selectedOptionTL: string = '';
  selectedOptionType: string = '';
  errorMessage: string = '';
  isError: boolean = false;
  dateVal: string = '';
  selectedOptionTLVal: string = '';
  selectedOptionTypeVal: string = '';
  setTimeVal: string = '';

  partnerId: number = 0;

  isShowOrder: boolean = false;
  isShowForMeEdit: boolean = false;
  isShowIcEdit: boolean = false;
  isShowFeEdit: boolean = false;

  nameText: string = "";
  expText: string = "";
  addressText: string = "";
  desText: string = "";
  prizeText: string = "";
  interestText: string = "";
  languageText: string = "";
  cameraText: string = "";

  isShowAskRepair: boolean = false;
  isShowAddPortfo: boolean = false;
  isShowWarehouse: boolean = false;

  modalName: string = "";
  modalImagesRepair: string[] = [];

  toggleAsk(name: string) {
    this.isShowAskRepair = !this.isShowAskRepair;
    this.modalName = name;
    this.decesData?.category.forEach((item) => {
      if (item.name === name) {
        this.modalImagesRepair = item.images;
        return;
      }
    });
  }

  closeAsk() {
    this.isShowAskRepair = false;
  }

  constructor(private router: Router, private route: ActivatedRoute,
    private orderService: Order1Service,
    private userInfoDTOService: UserInfoDTO1Service,
    private userInfoService: UserInfo1Service,
    private userService: User1Service,
    private decesService: Deces1Service,
    private fileStorage: AngularFireStorage) {

    this.route.params.subscribe(params => {
      const id = params['id'];

      if (id) {
        this.partnerId = parseInt(id, 10);
      } else {
        console.error('ID not found in URL');
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        const user_id = parseInt(id, 10);
        this.loadUserInfoData(user_id);
        this.loadDecesData(user_id);
      } else {
        console.error('ID not found in URL');
      }
    });
  }

  loadUserInfoData(user_id: number) {
    this.userInfoDTOService.getUserInfoDTOsById(user_id).subscribe(
      (userData) => {
        this.userData = userData;
        this.nameText = this.userData?.user.full_name || "";
        this.addressText = this.userData?.user.address || "";
        this.expText = this.userData?.user.exp.toString() || "";
        this.desText = this.userData?.userInfo.description || "";
        this.prizeText = this.userData?.userInfo.prize || "";
        this.interestText = this.userData?.userInfo.interest || "";
        this.languageText = this.userData?.userInfo.language || "";
        this.cameraText = this.userData?.userInfo.camera || "";
      },
      (error) => {
        console.error('Error loading user info:', error);
      }
    );
  }

  async loadDecesData(user_id: number) {
    this.decesData = await this.decesService.getDecesByPartnerId(user_id);
    console.log(this.decesData);
  }

  onDateChange(date: string) {
    this.dateVal = date;
  }

  onOptionTLChange(optionValue: string) {
    this.selectedOptionTLVal = optionValue;
  }
  onOptionTypeChange(optionValue: string) {
    this.selectedOptionTypeVal = optionValue;
  }

  async onSubmit() {
    this.isError = false;

    if (!this.selectedDateU || !this.selectedOptionTL || !this.selectedOptionType) {
      this.errorMessage = "Vui lòng điền đầy đủ thông tin";
      this.isError = true;
      console.log(this.dateVal);
      console.log(this.setTimeVal);
      // console.log(this.selectedOptionTLVal);
      // console.log(this.selectedOptionTypeVal);


    } else {

      if (this.partnerId !== 0) {
        console.log("true");
        const order: Order = {
          id: 0,
          order_date: this.dateVal,
          time: this.selectedOptionTLVal,
          appoi_time: this.setTimeVal,
          shooting_type: this.selectedOptionTypeVal,
          partner_id: this.partnerId,
          cust_name: "",
          cust_email: "",
          cust_phone: "",
          code: "",
          status: 'cho_duyet',
          address: "",
          price: '',
          link_down: '',
          des_refund: ''
        };

        var addedOrder = await this.orderService.createOrder(order);
        if (addedOrder) {
          localStorage.setItem('order_id', addedOrder.id.toString());
          this.router.navigate(['/contact']);
        } else {
          // Xử lý khi có lỗi trong quá trình lưu đơn hàng.
        }
      };
    }
  }


  showOrder() {
    this.isShowOrder = true;
  }

  hideOrder() {
    this.isShowOrder = false;
  }

  showForMeEdit() {
    this.isShowForMeEdit = true;
  }
  showIcEdit() {
    this.isShowIcEdit = true;
  }
  showFeEdit() {
    this.isShowFeEdit = true;
  }
  hideForMeEdit() {
    this.isShowForMeEdit = false;
  }
  hideIcEdit() {
    this.isShowIcEdit = false;
  }
  hideFeEdit() {
    this.isShowFeEdit = false;
  }

  toggleWarehouse() {
    this.isShowWarehouse = !this.isShowWarehouse;
  }

  hideWarehouse() {
    this.isShowWarehouse = true; // Set isShowWarehouse to false to hide the menu
  }

  updateValue(fieldName: string, newValue: string) {
    switch (fieldName) {
      case 'nameText':
        this.nameText = newValue;
        break;
      case 'desText':
        this.desText = newValue;
        break;
      case 'prizeText':
        this.prizeText = newValue;
        break;
      case 'interestText':
        this.interestText = newValue;
        break;
      case 'addressText':
        this.addressText = newValue;
        break;
      case 'expText':
        this.expText = newValue;
        break;
      // Thêm các trường khác tùy theo cần thiết
    }
  }


  async saveIc() {
    if (this.userData?.user.id !== undefined) {
      const userInfoId = this.userData?.userInfo.id;

      var userInfo = await this.userInfoService.getUserInfoById(userInfoId);
      if (userInfo) {
        if (this.desText !== undefined && this.prizeText !== undefined && this.interestText !== undefined) {
          userInfo.description = this.desText;
          userInfo.prize = this.prizeText;
          userInfo.interest = this.interestText;

          // Log thông tin
          console.log(userInfo);

          var updatedUserInfo = await this.userInfoService.updateUserInfo(userInfo);
          if (updatedUserInfo) {
            console.log('Thông tin người dùng được cập nhật thành công', updatedUserInfo);
            window.alert('Thông tin người dùng được cập nhật thành công');
          } else {
            console.error('Lỗi khi cập nhật thông tin người dùng');
            window.alert('Lỗi khi cập nhật thông tin người dùng');
          }
        } else {
          console.error('Một trong các trường dữ liệu là undefined');
          window.alert('Một trong các trường dữ liệu là undefined');
        }
      } else {
        console.error('Không tồn tại tại thông tin của tài khoản này');
        window.alert('Không tồn tại tại thông tin của tài khoản này');
      }
    } else {
      console.error('User ID is undefined');
      window.alert('User ID is undefined');
    }
  }

  async saveForMe() {
    if (this.userData?.user.id !== undefined) {
      const userId = this.userData?.user.id;

      var user = await this.userService.getUserById(userId);
      if (user) {
        if (this.nameText !== undefined && this.addressText !== undefined && this.expText !== undefined) {
          user.full_name = this.nameText;
          user.address = this.addressText;
          user.exp = parseFloat(this.expText);
          var updatedUser = await this.userService.updateUser(user);
          if (updatedUser) {
            console.log('Thông tin người dùng được cập nhật thành công', updatedUser);
            window.alert('Thông tin người dùng được cập nhật thành công');

          } else {
            console.error('Lỗi khi cập nhật thông tin người dùng');
            window.alert('Lỗi khi cập nhật thông tin người dùng');
          }
        } else {
          console.error('Một trong các trường dữ liệu là undefined');
          window.alert('Một trong các trường dữ liệu là undefined');
        }
      } else {
        console.error('Không tồn tại tại thông tin của tài khoản này');
        window.alert('Không tồn tại tại thông tin của tài khoản này');
      }
    } else {
      console.error('User ID is undefined');
      window.alert('User ID is undefined');
    }
  }

  async saveFe() {
    if (this.userData?.user.id !== undefined) {
      const userInfoId = this.userData?.userInfo.id;

      var userInfo = await this.userInfoService.getUserInfoById(userInfoId);
      if (userInfo) {
        if (this.languageText !== undefined && this.cameraText !== undefined) {
          userInfo.language = this.languageText;
          userInfo.prize = this.languageText;

          var updatedUserInfo = await this.userInfoService.updateUserInfo(userInfo);
          if (updatedUserInfo) {
            console.log('Thông tin người dùng được cập nhật thành công', updatedUserInfo);
            window.alert('Thông tin người dùng được cập nhật thành công');
          } else {
            console.error('Lỗi khi cập nhật thông tin người dùng');
            window.alert('Lỗi khi cập nhật thông tin người dùng');
          }
        } else {
          console.error('Một trong các trường dữ liệu là undefined');
          window.alert('Một trong các trường dữ liệu là undefined');
        }
      } else {
        console.error('Không tồn tại tại thông tin của tài khoản này');
        window.alert('Không tồn tại tại thông tin của tài khoản này');
      }
    } else {
      console.error('User ID is undefined');
      window.alert('User ID is undefined');
    }
  }

  showAddPortfo() {
    this.isShowAddPortfo = !this.isShowAddPortfo;
  }

  closeNewPortfo() {
    this.isShowAddPortfo = false;
  }

  imagePreviews: string[] = [];
  filesAddPortfo: File[] = [];
  portfo_name: string = "";
  previewImages(event: any) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      this.filesAddPortfo = Array.from(files);
      this.imagePreviews = []; // Clear the previous previews

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          this.imagePreviews.push(e.target?.result as string);
        };

        reader.readAsDataURL(file);
      }
    } else {
      this.imagePreviews = [];
    }
  }

  deleteImageOfNewPortfo(index: number) {
    if (index >= 0 && index < this.imagePreviews.length) {
      this.imagePreviews.splice(index, 1);
      this.filesAddPortfo.splice(index, 1);
      const input = document.getElementById('image') as HTMLInputElement;
      input.value = '';
    }
  }

  async addNewPortfo() {
    if (this.portfo_name !== "" && this.filesAddPortfo.length > 0) {
      var urls: string[] = [];
      var renamedFiles: File[] = [];

      // Generate unique filenames for each file
      for (let i = 0; i < this.filesAddPortfo.length; i++) {
        const file = this.filesAddPortfo[i];
        const fileExtension = file.name.split('.').pop();
        const newFileName = uuidv4() + '.' + fileExtension;

        renamedFiles.push(new File([file], newFileName, { type: file.type }));
      }

      // Upload the renamed files
      for (let i = 0; i < renamedFiles.length; i++) {
        const file = renamedFiles[i];
        const path = `images/${file.name}`;
        const uploadTask = await this.fileStorage.upload(path, file);
        const url = await uploadTask.ref.getDownloadURL();
        urls.push(url);
      }

      var des = await this.decesService.getDecesByPartnerId(this.partnerId);
      if (des) {
        var isDuplicate: boolean = false;
        des.category.forEach((catego) => {
          if (catego.name === this.portfo_name) {
            // catego.images.push(url);
            isDuplicate = true;
            return;
          } else {
          }
        });

        if (!isDuplicate) {
          var cate: Category = {
            name: this.portfo_name,
            images: urls
          }
          des.category.push(cate);
        }

        await this.decesService.updateDeces(des);
        window.alert('Category added successfully');
        await this.loadDecesData(this.partnerId);
      } else {
        var cate: Category = {
          name: this.portfo_name,
          images: urls
        }
        var cateList: Category[] = [];
        cateList.push(cate);
        var newDeces: Deces = {
          id: 0,
          partner_id: this.partnerId,
          category: cateList
        }
        await this.decesService.createDeces(newDeces);
        window.alert('Category added successfully');
        await this.loadDecesData(this.partnerId);
      }
    }
  }


  ////////////////////

  delPicture(index: number) {
    if (index >= 0 && index < this.modalImagesRepair.length) {
      this.modalImagesRepair.splice(index, 1);
    }
  }

  imageData: { url: string, file: File }[] = [];

  addImageFromAsk(url: string, file: File) {
    this.imageData.push({ url, file });
  }

  deleteImageFromAsk(index: number) {
    if (index >= 0 && index < this.imageData.length) {
      this.imageData.splice(index, 1);
    }
  }



  onFileInputChange(event: any) {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        this.addImageFromAsk(url, file); // Add both the URL and the file
      }
    }
  }


  triggerFileInput() {
    const fileInput = document.getElementById('hiddenFileInput') as HTMLInputElement;
    fileInput.click();
  }

  async submitRepair() {
    if (this.imageData.length > 0) {
      var urls: string[] = [];
      var renamedFiles: File[] = []; // Array to store renamed files

      // Generate unique filenames for each file in imageData
      for (let i = 0; i < this.imageData.length; i++) {
        const file = this.imageData[i].file;
        const fileExtension = file.name.split('.').pop(); // Get the file extension
        const newFileName = uuidv4() + '.' + fileExtension; // Generate a new unique filename

        renamedFiles.push(new File([file], newFileName, { type: file.type }));
      }

      // Upload the renamed files
      for (let i = 0; i < renamedFiles.length; i++) {
        const file = renamedFiles[i];
        const path = `images/${file.name}`;
        const uploadTask = await this.fileStorage.upload(path, file);
        const url = await uploadTask.ref.getDownloadURL();
        urls.push(url);
      }

      var des = await this.decesService.getDecesByPartnerId(this.partnerId);

      if (des) {
        var isDuplicate: boolean = false;

        for (let i = 0; i < des.category.length; i++) {
          const catego = des.category[i];

          if (catego.name === this.modalName) {
            // Add the new image URLs to the existing images array
            catego.images = [...catego.images, ...urls];

            // Update the 'des' object
            await this.decesService.updateDeces(des);

            window.alert('Category added successfully');

            // Load data again if needed
            await this.loadDecesData(this.partnerId);

            this.decesData?.category.forEach((item) => {
              if (item.name === this.modalName) {
                this.modalImagesRepair = item.images;
                return;
              }
            });
            this.imageData = [];

            isDuplicate = true;
            break; // Exit the loop
          }
        }

        if (!isDuplicate) {
          // Handle the case where the category doesn't exist
          // You can create a new category if needed
          // ...
        }
      }
    }
  }



}
