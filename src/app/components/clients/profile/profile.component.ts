import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
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


  constructor(private router: Router, private route: ActivatedRoute, private orderService: OrderService) {
    this.route.params.subscribe(params => {
      const id = params['id'];

      if (id) {
        this.partnerId = parseInt(id, 10);
      } else {
        console.error('ID not found in URL');
      }
    });
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
          session_id: ""
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
}

