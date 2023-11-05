import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { Review } from 'src/app/models/review.model';
import { Order1Service } from 'src/app/services/demo/order1.service';
import { Review1Service } from 'src/app/services/demo/review1.service';

@Component({
  selector: 'app-page-picture-refund',
  templateUrl: './page-picture-refund.component.html',
  styleUrls: ['./page-picture-refund.component.scss']
})
export class PagePictureRefundComponent {
  orderId!: number;
  order!: Order;
  isShowAskRepair: boolean = false;
  isDropdownOpen: boolean = false;
  des_refund: string = "";
  isHideInfo: boolean = false;
  comment: string = "";
  constructor(private router: Router,
    private route: ActivatedRoute,
    private orderService: Order1Service,
    private reviewService: Review1Service
  ) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.orderId = parseInt(id, 10);
      } else {
        console.error('ID not found in URL');
      }
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      const id = params['id'];
      if (id) {
        const order_id = parseInt(id, 10);
        this.orderService.getOrderById(order_id)
          .then(order => {
            if (order !== null) {
              this.order = order;
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else {
        console.error('ID not found in URL');
      }
    });
  }

  toggleAsk() {
    this.isShowAskRepair = !this.isShowAskRepair;
  }

  closeAsk() {
    this.isShowAskRepair = false;
  }

  // toggleDropdown() {
  //   this.isDropdownOpen = !this.isDropdownOpen;
  // }

  async sendAsk() {
    if (this.des_refund !== "") {
      var or = await this.orderService.getOrderById(this.orderId);
      if (or) {
        or.des_refund = this.des_refund;
        or.status = "yc_sua";
        var o = await this.orderService.updateOrder(or);
        if (o) {
          window.alert("Yêu cầu sửa ảnh thành công");
        } else {
          window.alert("Yêu cầu thất bại");
        }
      } else {
        window.alert("Yêu cầu thất bại");
      }
    } else {
      window.alert("Hãy nhập yêu cầu");
    }
  }

  toggleHideInfo() {
    this.isHideInfo = !this.isHideInfo;
  }

  selectedStars = ['bx bxs-star', 'bx bx-star', 'bx bx-star', 'bx bx-star', 'bx bx-star'];
  selected1Stars = ['bx bxs-star', 'bx bx-star', 'bx bx-star', 'bx bx-star', 'bx bx-star'];
  selected2Stars = ['bx bxs-star', 'bx bxs-star', 'bx bx-star', 'bx bx-star', 'bx bx-star'];
  selected3Stars = ['bx bxs-star', 'bx bxs-star', 'bx bxs-star', 'bx bx-star', 'bx bx-star'];
  selected4Stars = ['bx bxs-star', 'bx bxs-star', 'bx bxs-star', 'bx bxs-star', 'bx bx-star'];
  selected5Stars = ['bx bxs-star', 'bx bxs-star', 'bx bxs-star', 'bx bxs-star', 'bx bxs-star'];
  countStars = 0;
  chooseRate(index: number) {
    switch (index) {
      case 1:
        this.selectedStars = this.selected1Stars;
        this.countStars = 1;
        break;
      case 2:
        this.selectedStars = this.selected2Stars;
        this.countStars = 2;
        break;
      case 3:
        this.selectedStars = this.selected3Stars;
        this.countStars = 3;
        break;
      case 4:
        this.selectedStars = this.selected4Stars;
        this.countStars = 4;
        break;
      case 5:
        this.selectedStars = this.selected5Stars;
        this.countStars = 5;
        break;
      default:
        break;
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen
  }

  async onReview() {
    if (this.countStars > 0 && this.comment !== "") {
      var order = await this.orderService.getOrderById(this.orderId);
      if (order) {
        var re = await this.reviewService.getReviewByOrderId(order.id);
        var cus_name = this.isHideInfo ? "ẩn danh" : order.cust_name || "ẩn danh";
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        if (re === null) {
          const review: Review = {
            id: 0,
            partner_id: order.partner_id,
            cus_name: cus_name,
            order_id: order.id,
            description: this.comment,
            rate: this.countStars,
            date: formattedDate
          }
          var r = await this.reviewService.createReview(review);
          if (r) {
            window.alert("Đánh giá thành công");
          } else {
            window.alert("Đánh giá không thành công");
          }
        } else {
          const review: Review = {
            id: re.id,
            partner_id: order.partner_id,
            cus_name: cus_name,
            order_id: order.id,
            description: this.comment,
            rate: this.countStars,
            date: formattedDate
          }
          var r = await this.reviewService.updateReview(review);
          if (r) {
            window.alert("Đánh giá thành công");
          } else {
            window.alert("Đánh giá không thành công");
          }
        }
      }
    }
  }
}
