import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { UserInfoDTO } from 'src/app/models/userInfoDTO.model';
import { OrderService } from 'src/app/services/order.service';
import { UserInfoDTOService } from 'src/app/services/user-info-dto.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-partner-profile',
  templateUrl: './partner-profile.component.html',
  styleUrls: ['./partner-profile.component.scss']
})
export class PartnerProfileComponent implements OnInit {
  userData: UserInfoDTO | null = null;

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
  desText: string = "";
  prizeText: string = "";
  interestText: string = "";
  languageText: string = "";
  cameraText: string = "";

  constructor(private router: Router, private route: ActivatedRoute, private orderService: OrderService, private userInfoDTOService: UserInfoDTOService, private userInfoService: UserInfoService, private userService: UserService) {
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

  onDateChange(date: string) {
    this.dateVal = date;
  }

  onOptionTLChange(optionValue: string) {
    this.selectedOptionTLVal = optionValue;
  }
  onOptionTypeChange(optionValue: string) {
    this.selectedOptionTypeVal = optionValue;
  }

  onSubmit() {
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
          price: ''
        };

        this.orderService.addOrder(order).subscribe((addedOrder) => {
          if (addedOrder) {
            localStorage.setItem('order_id', addedOrder.id.toString());
            this.router.navigate(['/contact']);
          } else {
            // Xử lý khi có lỗi trong quá trình lưu đơn hàng.
          }
        });
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
      // Thêm các trường khác tùy theo cần thiết
    }
  }


  saveIc() {
    if (this.userData?.user.id !== undefined) {
      const userInfoId = this.userData?.userInfo.id;

      this.userInfoService.getUserInfoById(userInfoId).subscribe(userInfo => {
        if (userInfo) {
          if (this.desText !== undefined && this.prizeText !== undefined && this.interestText !== undefined) {
            userInfo.description = this.desText;
            userInfo.prize = this.prizeText;
            userInfo.interest = this.interestText;

            // console.log(userInfo);

            this.userInfoService.updateUserInfo(userInfo).subscribe(updatedUserInfo => {
              if (updatedUserInfo) {
                console.log('Thông tin người dùng được cập nhật thành công', updatedUserInfo);
              } else {
                console.error('Lỗi khi cập nhật thông tin người dùng');
              }
            });
          } else {
            console.error('Một trong các trường dữ liệu là undefined');
          }
        } else {
          console.error('Không tồn tại tại thông tin của tài khoản này');
        }
      })
    } else {
      console.error('User ID is undefined');
    }
  }

  saveForMe() {
    if (this.userData?.user.id !== undefined) {
      const userId = this.userData?.user.id;

      this.userService.getUserById(userId).subscribe(user => {
        if (user) {
          if (this.nameText !== undefined) {
            user.full_name = this.nameText;
            this.userService.updateUser(user).subscribe(updatedUser => {
              if (updatedUser) {
                console.log('Thông tin người dùng được cập nhật thành công', updatedUser);
              } else {
                console.error('Lỗi khi cập nhật thông tin người dùng');
              }
            });
          } else {
            console.error('Một trong các trường dữ liệu là undefined');
          }
        } else {
          console.error('Không tồn tại tại thông tin của tài khoản này');
        }
      })
    } else {
      console.error('User ID is undefined');
    }
  }
}
