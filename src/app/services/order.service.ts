import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://photohub-backend.onrender.com/orders';
  private cachedOrders: Order[] | null = null;

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Order[]> {
    if (this.cachedOrders) {
      return of(this.cachedOrders);
    } else {
      return this.http.get<Order[]>(this.apiUrl).pipe(
        tap(orders => this.cachedOrders = orders),
        catchError(error => {
          return throwError('Unable to fetch orders');
        })
      );
    }
  }

  getOrderById(id: number): Observable<Order | null> {
    return this.getAllOrders().pipe(
      map((orders: Order[]) => orders.find(order => order.id === id) || null)
    );
  }

  addOrder(order: Order): Observable<Order | null> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Order | null>(this.apiUrl, order, { headers }).pipe(
      catchError((error) => {
        console.error('Error adding order:', error);
        return of(null);
      }),
      tap((addedOrder) => {
        if (this.cachedOrders && addedOrder) {
          this.cachedOrders.push(addedOrder);
        }
      })

    );
  }

  updateOrder(order: Order): Observable<Order | null> {
    const url = `${this.apiUrl}/${order.id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<Order | null>(url, order, { headers }).pipe(
      catchError((error) => {
        console.error('Error updating order:', error);
        return of(null);
      }),
      tap((updatedOrder) => {
        if (this.cachedOrders && updatedOrder) {
          const index = this.cachedOrders.findIndex(o => o.id === updatedOrder.id);
          if (index !== -1) {
            this.cachedOrders[index] = updatedOrder;
          }
        }
      })
    );
  }

}
