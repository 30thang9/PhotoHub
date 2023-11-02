import { Injectable } from '@angular/core';
import { Order1Service } from './order1.service';
import { User1Service } from './user1.service';
import { OrderDTO } from 'src/app/models/orderDTO.model';
import { Observable, catchError, combineLatest, map, of } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDTO1Service {

  constructor(private orderService: Order1Service, private userService: User1Service) { }

  getOrderDTOs(): Observable<OrderDTO[]> {
    return combineLatest([
      this.orderService.getOrders(),
      this.userService.getUsers()
    ]).pipe(
      map(([orders, userList]) => {
        const users: OrderDTO[] = [];
        for (const order of orders) {
          const user = userList.find(u => u.id === order.partner_id);
          if (user)
            users.push({ order, user });
        }
        return users;
      }),
      catchError(error => {
        return [];
      })
    );
  }

  getOrderDTOsByStatus(status: string): Observable<OrderDTO[]> {
    return combineLatest([
      this.orderService.getOrders(),
      this.userService.getUsers()
    ]).pipe(
      map(([orders, userList]) => {
        const orderDTOs: OrderDTO[] = [];
        for (const order of orders) {
          const user = userList.find(u => u.id === order.partner_id && order.status === status);
          if (user)
            orderDTOs.push({ order, user });
        }
        return orderDTOs;
      }),
      catchError(error => {
        return [];
      })
    );

  }

  getOrderDTOsById(id: number): Observable<OrderDTO | null> {
    return this.getOrderDTOs().pipe(
      map((orders: OrderDTO[]) => orders.find(order => order.order.id === id) || null)
    );
  }

  async updateOrder(orderDTO: OrderDTO): Promise<Observable<OrderDTO | null>> {
    var order = await this.orderService.getOrderById(orderDTO.order.id);
    if (!order) {
      return of(null);
    }
    orderDTO.order.status = 'da_duyet';
    order = await this.orderService.updateOrder(orderDTO.order);
    if (!order) {
      return of(null);
    } else {
      orderDTO.order = order;
      return of(orderDTO);
    }
  }
}
