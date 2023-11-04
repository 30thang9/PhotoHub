import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set, remove, push, get, child, runTransaction } from "firebase/database";
import { Observable, of } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Order } from 'src/app/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class Order1Service {

  getOrders(): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);
      const starCountRef = ref(db, 'orders/');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const orders = [];

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const orderData = data[key];
            const order: Order = {
              id: orderData.id,
              order_date: orderData.order_date,
              time: orderData.time,
              appoi_time: orderData.appoi_time,
              shooting_type: orderData.shooting_type,
              partner_id: orderData.partner_id,
              cust_name: orderData.cust_name,
              cust_email: orderData.cust_email,
              cust_phone: orderData.cust_phone,
              address: orderData.address,
              price: orderData.price,
              status: orderData.status,
              code: orderData.code,
              link_down: orderData.link_down,
              des_refund: orderData.des_refund
            };

            orders.push(order);
          }
        }

        resolve(orders); // Trả về danh sách người dùng khi hoàn thành
      });
    });
  }

  getOrderByPartnerId(partnerId: number): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);
      const starCountRef = ref(db, 'orders/');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const orders = [];

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const orderData = data[key];
            if (orderData.partner_id === partnerId) {
              const order: Order = {
                id: orderData.id,
                order_date: orderData.order_date,
                time: orderData.time,
                appoi_time: orderData.appoi_time,
                shooting_type: orderData.shooting_type,
                partner_id: orderData.partner_id,
                cust_name: orderData.cust_name,
                cust_email: orderData.cust_email,
                cust_phone: orderData.cust_phone,
                address: orderData.address,
                price: orderData.price,
                status: orderData.status,
                code: orderData.code,
                link_down: orderData.link_down,
                des_refund: orderData.des_refund
              };

              orders.push(order);
            }
          }
        }
        resolve(orders);
      });
    });
  }

  getOrderByStatus(status: string): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);
      const starCountRef = ref(db, 'orders/');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const orders = [];

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const orderData = data[key];
            if (orderData.status === status) {
              const order: Order = {
                id: orderData.id,
                order_date: orderData.order_date,
                time: orderData.time,
                appoi_time: orderData.appoi_time,
                shooting_type: orderData.shooting_type,
                partner_id: orderData.partner_id,
                cust_name: orderData.cust_name,
                cust_email: orderData.cust_email,
                cust_phone: orderData.cust_phone,
                address: orderData.address,
                price: orderData.price,
                status: orderData.status,
                code: orderData.code,
                link_down: orderData.link_down,
                des_refund: orderData.des_refund
              };

              orders.push(order);
            }
          }
        }
        resolve(orders);
      });
    });
  }

  async getOrderById(id: number): Promise<Order | null> {
    try {
      const orders = await this.getOrders();
      const order = orders.find((order) => order.id === id);
      return order || null;
    } catch (error) {
      console.error('Error fetching Order by ID:', error);
      return null;
    }
  }

  async getOrderByCode(code: string): Promise<Order | null> {
    try {
      const orders = await this.getOrders();
      const order = orders.find((order) => order.code === code);
      return order || null;
    } catch (error) {
      console.error('Error fetching Order by code:', error);
      return null;
    }
  }

  // async getOrderByPartnerId(partnerId: number): Promise<Order[]> {
  //   try {
  //     const orderInfos = await this.getOrders();
  //     const orderInfo = orderInfos.filter((Order) => Order.partner_id === partnerId);
  //     return orderInfo;
  //   } catch (error) {
  //     console.error('Error fetching Order by Ordername', error);
  //     return [];
  //   }
  // }


  async createOrder(orderData: Order): Promise<Order | null> {
    try {
      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);
      const newOrderId = await this.generateNewId();
      const newOrderRef = ref(db, 'orders/' + newOrderId);

      const newOrder: Order = {
        id: newOrderId,
        order_date: orderData.order_date,
        time: orderData.time,
        appoi_time: orderData.appoi_time,
        shooting_type: orderData.shooting_type,
        partner_id: orderData.partner_id,
        cust_name: orderData.cust_name,
        cust_email: orderData.cust_email,
        cust_phone: orderData.cust_phone,
        address: orderData.address,
        price: orderData.price,
        status: orderData.status,
        code: orderData.code,
        link_down: orderData.link_down,
        des_refund: orderData.des_refund
      };

      await set(newOrderRef, newOrder);
      return newOrder;
    } catch (error) {
      console.error('Error creating Order:', error);
      return null;
    }
  }

  async updateOrder(orderData: Order): Promise<Order | null> {
    try {
      const OrderInfos = await this.getOrderById(orderData.id);

      if (OrderInfos === null) {
        console.error('Order information not found for ID:', orderData.id);
        return null;
      }
      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);

      const up: Order = {
        id: orderData.id,
        order_date: orderData.order_date,
        time: orderData.time,
        appoi_time: orderData.appoi_time,
        shooting_type: orderData.shooting_type,
        partner_id: orderData.partner_id,
        cust_name: orderData.cust_name,
        cust_email: orderData.cust_email,
        cust_phone: orderData.cust_phone,
        address: orderData.address,
        price: orderData.price,
        status: orderData.status,
        code: orderData.code,
        link_down: orderData.link_down,
        des_refund: orderData.des_refund
      };

      // Update the Order info in Firebase
      const OrderInfoRef = ref(db, `orders/${orderData.id}`);
      await set(OrderInfoRef, up);
      return orderData;
    } catch (error) {
      console.error('Error updating Order:', error);
      return null;
    }
  }

  async generateNewId(): Promise<number> {
    const Orders = await this.getOrders();
    const maxId = Orders.length === 0 ? 0 : Math.max(...Orders.map((Order) => Order.id));
    return maxId + 1;
  }

  async isOrderCodeUnique(code: string): Promise<boolean> {
    const app = initializeApp(environment.firebaseConfig);
    const db = getDatabase(app);
    const ordersRef = ref(db, 'orders');

    const snapshot = await get(ordersRef);
    const data = snapshot.val();

    if (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key].code === code) {
            // The code is not unique
            return false;
          }
        }
      }
    }
    return true;
  }

  async generateUniqueOrderCode(): Promise<Observable<string>> {
    const newOrderCode = this.generateRandomOrderCode(6);

    if (await this.isOrderCodeUnique(newOrderCode)) {
      return of(newOrderCode);
    } else {
      return this.generateUniqueOrderCode();
    }
  }

  private generateRandomOrderCode(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // private isOrderCodeUnique(code: string): boolean {
  //   if (this.cachedOrders) {
  //     for (const order of this.cachedOrders) {
  //       if (order.code === code) {
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // }
}
