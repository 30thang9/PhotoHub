import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { Order1Service } from 'src/app/services/demo/order1.service';

@Component({
  selector: 'app-warehouse-picture',
  templateUrl: './warehouse-picture.component.html',
  styleUrls: ['./warehouse-picture.component.scss']
})
export class WarehousePictureComponent {
  partnerId!: number;
  orders: Order[] = [];
  linkText: string = "";
  isShowAskRepair: boolean = false;
  isDropdownOpen: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private orderService: Order1Service,
  ) {
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
    this.route.params.subscribe(async params => {
      const id = params['id'];
      if (id) {
        const partner_id = parseInt(id, 10);
        this.orders = await this.orderService.getOrderByPartnerId(partner_id);
        this.orders = this.orders.filter(order => order.status === "da_duyet" || order.status === "da_tra" || order.status === "yc_sua");
      }
      else {
        console.error('ID not found in URL');
      }
    });
  }

  async onAccept(id: number) {
    var order = this.orders.find(o => o.id === id);
    if (order) {
      if (order.link_down !== "") {
        order.status = "da_tra";
        var or = await this.orderService.updateOrder(order);
        if (or) {
          window.alert("Trả ảnh thành công");
          this.orders = await this.orderService.getOrderByPartnerId(this.partnerId);
        } else {
          window.alert("Không thành công");
        }
      } else {
        window.alert("Vui lòng điền link");
      }
    }
  }
  async onRepair(id: number) {
    var order = this.orders.find(o => o.id === id);
    if (order) {
      if (order.link_down !== "") {
        var or = await this.orderService.updateOrder(order);
        if (or) {
          window.alert("Trả ảnh thành công");
          this.orders = await this.orderService.getOrderByPartnerId(this.partnerId);
        } else {
          window.alert("Không thành công");
        }
      } else {
        window.alert("Vui lòng điền link");
      }
    }
  }

  toggleAsk() {
    this.isShowAskRepair = !this.isShowAskRepair;
  }

  closeAsk() {
    this.isShowAskRepair = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
