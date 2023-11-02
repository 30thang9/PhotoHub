import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { OrderService } from './order.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, combineLatest, map, of } from 'rxjs';
import { Order } from '../models/order.model';
import { OrderDTO } from '../models/orderDTO.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDTOService {
  private cachedOrderDTO: OrderDTO[] | null = null;

  constructor(private userService: UserService, private orderService: OrderService) { }


  getOrderDTOById(id: number): Observable<OrderDTO | null> {
    return this.getOrdersDTO().pipe(
      map((orders: OrderDTO[]) => orders.find(order => order.order.id === id) || null)
    );
  }

  getOrdersDTO(): Observable<OrderDTO[]> {
    if (this.cachedOrderDTO) {
      return of(this.cachedOrderDTO);
    }

    return combineLatest([
      this.orderService.getAllOrders(),
      this.userService.getUsers()
    ]).pipe(
      map(([orders, userList]) => {
        const ordersDTO: OrderDTO[] = [];
        for (const order of orders) {
          const user = userList.find(u => u.id === order.partner_id);
          if (user)
            ordersDTO.push({ order, user });
        }
        return ordersDTO;
      }),
      catchError(error => {
        return [];
      })
    );
  }

  getOrdersDTOByStatus(s: string): Observable<OrderDTO[]> {
    if (this.cachedOrderDTO) {
      return of(this.cachedOrderDTO);
    }

    return combineLatest([
      this.orderService.getAllOrders(),
      this.userService.getUsers()
    ]).pipe(
      map(([orders, userList]) => {
        const ordersDTO: OrderDTO[] = [];
        for (const order of orders) {
          const user = userList.find(u => u.id === order.id && order.status === s);
          if (user)
            ordersDTO.push({ order, user });
        }
        return ordersDTO;
      }),
      catchError(error => {
        return [];
      })
    );
  }

  updateOrder(orderDTO: OrderDTO): Observable<OrderDTO | null> {
    orderDTO.order.status = 'da_duyet';
    return this.orderService.updateOrder(orderDTO.order).pipe(
      map(updatedOrder => {
        if (updatedOrder) {
          orderDTO.order = updatedOrder;

          if (this.cachedOrderDTO) {
            const index = this.cachedOrderDTO.findIndex(item => item.order.id === updatedOrder.id);
            if (index !== -1) {
              this.cachedOrderDTO[index] = orderDTO;
            }
          }

          return orderDTO;
        } else {
          return null;
        }
      }),
      catchError(error => {
        console.error('Lỗi khi cập nhật:', error);
        return of(null);
      })
    );
  }

}
