import { Component, OnInit } from '@angular/core';
import { OrderDTO } from 'src/app/models/orderDTO.model';
import { OrderDTO1Service } from 'src/app/services/demo/order-dto1.service';

@Component({
  selector: 'app-order-accept-admin',
  templateUrl: './order-accept-admin.component.html',
  styleUrls: ['./order-accept-admin.component.scss']
})
export class OrderAcceptAdminComponent implements OnInit {
  orderData: OrderDTO[] = [];
  constructor(private orderDTOService: OrderDTO1Service) { }
  ngOnInit(): void {
    this.loadOrderData();
  }
  loadOrderData() {
    this.orderDTOService.getOrderDTOsByStatus('cho_duyet').subscribe(
      (data: OrderDTO[]) => {
        this.orderData = data;
      }, (err: any) => {
        console.error('Error fetching order: ', err);
      });
  }

  onAccept(id: number): void {
    console.log(id);
    this.orderDTOService.getOrderDTOsById(id).subscribe(
      async (result: OrderDTO | null) => {
        if (result !== null) {
          console.log('Dữ liệu đã tìm thấy:', result);
          (await this.orderDTOService.updateOrder(result)).subscribe(
            (updatedOrder: OrderDTO | null) => {
              if (updatedOrder !== null) {
                // Cập nhật lại dữ liệu sau khi cập nhật thành công
                this.loadOrderData();
              } else {
                console.log('Cập nhật thất bại.');
              }
            },
            (error) => {
              console.error('Lỗi khi cập nhật:', error);
            }
          );
        } else {
          console.log('Dữ liệu không tồn tại.');
        }
      },
      (error) => {
        console.error('Lỗi xảy ra:', error);
      }
    );
  }

}
