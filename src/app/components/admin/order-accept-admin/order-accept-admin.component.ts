import { Component, OnInit } from '@angular/core';
import { OrderDTO } from 'src/app/models/orderDTO.model';
import { OrderDTOService } from 'src/app/services/order-dto.service';

@Component({
  selector: 'app-order-accept-admin',
  templateUrl: './order-accept-admin.component.html',
  styleUrls: ['./order-accept-admin.component.scss']
})
export class OrderAcceptAdminComponent implements OnInit {
  orderData: OrderDTO[] = [];
  constructor(private orderDTOService: OrderDTOService) { }
  ngOnInit(): void {
    this.loadOrderData();
  }
  loadOrderData() {
    this.orderDTOService.getOrdersDTOByStatus('cho_duyet').subscribe(
      (data: OrderDTO[]) => {
        this.orderData = data;
      }, (err: any) => {
        console.error('Error fetching order: ', err);
      });
  }

  onAccept(id: number): void {
    console.log(id);
    this.orderDTOService.getOrderDTOById(id).subscribe(
      (result: OrderDTO | null) => {
        if (result !== null) {
          console.log('Dữ liệu đã tìm thấy:', result);
          this.orderDTOService.updateOrder(result).subscribe(
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
