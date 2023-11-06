import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Deces } from 'src/app/models/deces.model';
import { Order } from 'src/app/models/order.model';
import { Review } from 'src/app/models/review.model';
import { TypeOfPhoto } from 'src/app/models/typeOfPhoto.model';
import { UserInfoDTO } from 'src/app/models/userInfoDTO.model';
import { Wall } from 'src/app/models/wall.model';
import { Deces1Service } from 'src/app/services/demo/deces1.service';
import { Order1Service } from 'src/app/services/demo/order1.service';
import { Review1Service } from 'src/app/services/demo/review1.service';
import { UserInfoDTO1Service } from 'src/app/services/demo/user-info-dto1.service';
import { Wall1Service } from 'src/app/services/demo/wall1.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userData: UserInfoDTO | null = null;
  decesData: Deces | null = null;
  reviewData: Review[] = [];
  orderData: Order[] = [];
  wallData!: Wall | null;
  wallImages: string[] = [];

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
  isValidOrderTime: boolean = true;

  typeOfPhoto: TypeOfPhoto[] = [];
  costPreview: number = 300000;

  review0Star = ['bx bx-star', 'bx bx-star', 'bx bx-star', 'bx bx-star', 'bx bx-star'];
  review1Star = ['bx bxs-star', 'bx bx-star', 'bx bx-star', 'bx bx-star', 'bx bx-star'];
  review2Star = ['bx bxs-star', 'bx bxs-star', 'bx bx-star', 'bx bx-star', 'bx bx-star'];
  review3Star = ['bx bxs-star', 'bx bxs-star', 'bx bxs-star', 'bx bx-star', 'bx bx-star'];
  review4Star = ['bx bxs-star', 'bx bxs-star', 'bx bxs-star', 'bx bxs-star', 'bx bx-star'];
  review5Star = ['bx bxs-star', 'bx bxs-star', 'bx bxs-star', 'bx bxs-star', 'bx bxs-star'];
  countRate = 0;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private orderService: Order1Service,
    private userInfoDTOService: UserInfoDTO1Service,
    private reviewService: Review1Service,
    private wallService: Wall1Service,
    private decesService: Deces1Service) {
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
        this.loadReviewData(user_id);
        this.loadOrderData(user_id);
        this.loadWall(user_id);
      } else {
        console.error('ID not found in URL');
      }
    });
  }

  async loadWall(user_id: number) {
    this.wallData = await this.wallService.getWallByUserId(user_id);
    if (this.wallData) {
      this.wallImages = this.wallData.images;
      console.log(this.wallImages);

    }
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

  async loadDecesData(user_id: number) {
    this.decesData = await this.decesService.getDecesByPartnerId(user_id);
    console.log(this.decesData);
  }
  async loadOrderData(user_id: number) {
    this.orderData = await this.orderService.getOrderByPartnerId(user_id);
  }

  async loadReviewData(user_id: number) {
    this.reviewData = await this.reviewService.getReviewByPartnerId(user_id);
    this.reviewData.sort((a, b) => {
      const timestampA = new Date(a.date).getTime();
      const timestampB = new Date(b.date).getTime();
      return timestampB - timestampA;
    });
    var c = 0.0;
    var i = 0;
    this.reviewData.forEach(r => {
      c += r.rate;
      i++;
    });
    if (i > 0) {
      this.countRate = parseFloat((c / i).toFixed(1));;
    } else {
      this.countRate = 0.0;
    }
  }

  onDateChange(date: string) {
    this.dateVal = date;
    this.validBook();
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
    this.validBook();
  }

  onSetTimeChange() {
    this.validBook();
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

  validBook() {
    if (this.dateVal !== "" && this.setTimeVal !== "" && this.selectedOptionTLVal !== "") {
      const ors = this.orderData.filter(x => x.order_date === this.dateVal);
      if (ors.length > 0) {
        var v = this.setTimeVal.split(':');
        console.log(v[0]);
        console.log(v[1]);
        const startTime = parseInt(v[0].trim()) * 3600 + parseInt(v[1].trim()) * 60;
        const duration = parseInt(this.selectedOptionTLVal) * 3600;
        const endTime = startTime + duration;

        let isValid = true;

        ors.forEach(o => {
          var vo = o.appoi_time.split(':');
          const startTimeOrder = parseInt(vo[0].trim()) * 3600 + parseInt(vo[1].trim()) * 60;
          const durationOrder = parseInt(o.time) * 3600;
          const endTimeOrder = startTimeOrder + durationOrder;

          console.log(startTime);
          console.log(endTime);
          console.log(startTimeOrder);
          console.log(endTimeOrder);

          if ((startTime >= startTimeOrder && startTime <= endTimeOrder) || (endTime >= startTimeOrder && endTime <= endTimeOrder)) {
            isValid = false;
            this.errorMessage = `Tiếc quá đã có người đặt từ: ${this.formatTimeFromSeconds(startTimeOrder)} đến ${this.formatTimeFromSeconds(endTimeOrder)}`;
            this.isError = true;
            this.isValidOrderTime = false;
            return;
          } else if ((startTimeOrder >= startTime && startTimeOrder <= endTime) || (endTimeOrder >= startTime && endTimeOrder <= endTime)) {
            isValid = false;
            this.errorMessage = `Tiếc quá đã có người đặt từ: ${this.formatTimeFromSeconds(startTimeOrder)} đến ${this.formatTimeFromSeconds(endTimeOrder)}`;
            this.isError = true;
            this.isValidOrderTime = false;
            return;
          }
        });

        if (!isValid) {
          console.log("Khoảng thời gian không hợp lệ với đơn đặt hàng hiện tại.");
        } else {
          console.log("Khoảng thời gian hợp lệ.");
          this.isError = false;
          this.isValidOrderTime = true;
        }
      }
    }
  }

  formatTimeFromSeconds(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }


  async onSubmit() {
    // this.isError = false;

    if (!this.selectedDateU || !this.selectedOptionTL || !this.selectedOptionType || !this.setTimeVal || !this.isValidOrderTime) {
      if (this.isValidOrderTime) { this.errorMessage = "Vui lòng điền đầy đủ thông tin"; }
      this.isError = true;
    } else {

      if (this.partnerId !== 0) {
        console.log("true");
        const price = this.costPreview;
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
          link_down: '',
          des_refund: ''
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

  isShowReview: boolean = false;
  imagesForCarousel: string[] = [];

  showReview(i: number) {
    this.imagesForCarousel = [];
    const images: string[] = this.decesData?.category[i]?.images || [];

    if (images.length > 0) {
      this.imagesForCarousel = this.imagesForCarousel.concat(images);
    }

    this.isShowReview = !this.isShowReview;
  }

  closeReview() {
    this.isShowReview = false;
  }
}

