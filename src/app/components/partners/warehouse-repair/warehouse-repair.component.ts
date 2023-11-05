import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { Order1Service } from 'src/app/services/demo/order1.service';

@Component({
  selector: 'app-warehouse-repair',
  templateUrl: './warehouse-repair.component.html',
  styleUrls: ['./warehouse-repair.component.scss']
})
export class WarehouseRepairComponent {
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
        this.loadData(partner_id);
      }
      else {
        console.error('ID not found in URL');
      }
    });
  }

  async loadData(partner_id: number) {
    this.orders = await this.orderService.getOrderByPartnerId(partner_id);
    this.orders = this.orders.filter(order => order.status === "yc_sua");
  }

  async onConfirm(id: number) {
    var order = this.orders.find(o => o.id === id);
    if (order) {
      order.status = "da_tra";
      var or = await this.orderService.updateOrder(order);
      if (or) {
        window.alert("Xác nhận thành công");
        this.loadData(or.partner_id);
      } else {
        window.alert("lỗi hệ thống");
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
