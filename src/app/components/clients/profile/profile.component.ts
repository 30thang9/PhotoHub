import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { TypeOfPhoto } from 'src/app/models/typeOfPhoto.model';
import { UserInfoDTO } from 'src/app/models/userInfoDTO.model';
import { Order1Service } from 'src/app/services/demo/order1.service';
import { UserInfoDTO1Service } from 'src/app/services/demo/user-info-dto1.service';
import { OrderService } from 'src/app/services/order.service';
import { UserInfoDTOService } from 'src/app/services/user-info-dto.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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

  typeOfPhoto: TypeOfPhoto[] = [];
  costPreview: number = 300000;


  constructor(private router: Router, private route: ActivatedRoute, private orderService: Order1Service, private userInfoDTOService: UserInfoDTO1Service) {
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
        this.typeOfPhoto = this.userData?.userInfo.typeOfPhoto || [];

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
    console.log(optionValue);
    var tl = parseInt(this.selectedOptionTLVal, 10);
    if (this.selectedOptionTypeVal !== "") {
      var type_id = parseInt(this.selectedOptionTypeVal, 10);
      const selectedType = this.typeOfPhoto.find(t => t.id === type_id);
      if (selectedType) {
        var cost = parseInt(selectedType.cost, 10);
        this.costPreview = cost * tl;
      }
    }
  }

  onOptionTypeChange(optionValue: string) {
    this.selectedOptionTypeVal = optionValue;
    const optionId = parseInt(optionValue.trim(), 10);
    const selectedType = this.typeOfPhoto.find(t => t.id === optionId);
    if (selectedType) {
      var cost = parseInt(selectedType.cost, 10);
      if (this.selectedOptionTLVal !== "") {
        var tl = parseInt(this.selectedOptionTLVal, 10);
        this.costPreview = cost * tl;
      } else {
        this.costPreview = cost;
      }
    }
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
        const price = parseInt(this.selectedOptionTLVal, 10) * this.costPreview;
        const selectedOptionTypeText = this.typeOfPhoto.find(t => t.id == parseInt(this.selectedOptionTLVal))?.name;
        const order: Order = {
          id: 0,
          order_date: this.dateVal,
          time: this.selectedOptionTLVal,
          appoi_time: this.setTimeVal,
          shooting_type: selectedOptionTypeText || "",
          partner_id: this.partnerId,
          cust_name: "",
          cust_email: "",
          cust_phone: "",
          code: "",
          status: 'chua_dien_tt',
          address: "",
          price: price.toString(),
          link_down: ''
        };

        var newOrder = await this.orderService.createOrder(order);
        if (newOrder) {
          localStorage.setItem('order_id', newOrder.id.toString());
          this.router.navigate(['/contact']);
        } else {
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
}

