import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { User1Service } from 'src/app/services/demo/user1.service';
import { getDatabase, onValue, ref, set } from "firebase/database";
import { UserInfo1Service } from 'src/app/services/demo/user-info1.service';
import { UserInfoDTO1Service } from 'src/app/services/demo/user-info-dto1.service';
import { UserInfoDTO } from 'src/app/models/userInfoDTO.model';
import { Order1Service } from 'src/app/services/demo/order1.service';
import { OrderDTO1Service } from 'src/app/services/demo/order-dto1.service';
import { OrderDTO } from 'src/app/models/orderDTO.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserInfo1Service, private io: UserInfoDTO1Service, private order: Order1Service, private orderDTO: OrderDTO1Service) { }
  users: User[] = [];
  usey: UserInfoDTO[] = [];
  orderDTOs: OrderDTO[] = [];
  ngOnInit(): void {
    // this.addOrders();
    this.ui();
    this.uo();
  }

  async ui() {
    this.io.getUserInfoDTOs().subscribe(
      (data) => {
        this.usey = data;
        // Do something with the userInfoDTOs data here
        console.log(this.usey);

      },
      (error) => {
        console.error('Error fetching UserInfoDTOs:', error);
      }
    );
  }
  async uo() {
    this.orderDTO.getOrderDTOs().subscribe(
      (data) => {
        this.orderDTOs = data;
        // Do something with the userInfoDTOs data here
        console.log(this.orderDTOs);

      },
      (error) => {
        console.error('Error fetching UserInfoDTOs:', error);
      }
    );
  }

  async addOrders(this: any) {
    const usersToAdd = [
      {
        "id": 1,
        "order_date": "19/10/2023",
        "time": "3",
        "appoi_time": "09:30",
        "shooting_type": "Chụp ảnh lookbook",
        "partner_id": 6,
        "cust_name": "Bùi Diệp Hương Nhi",
        "cust_email": "huongnhi25@gmail.com",
        "cust_phone": "0986089540",
        "address": "Hà Nội",
        "status": "cho_duyet",
        "code": "NGH78H",
        "price": 1000000
      },
      {
        "id": 2,
        "order_date": "11/10/2023",
        "time": "2",
        "appoi_time": "09:30",
        "shooting_type": "Chụp beauty",
        "partner_id": 1,
        "cust_name": "Nguyen Thi Mai Huong",
        "cust_email": "mhuong@gmail.com",
        "cust_phone": "0123456789",
        "address": "Studio Tiểu Thuý_ Số 234 Hoàng Mai - Hà Nội",
        "status": "cho_duyet",
        "code": "ATHH67",
        "price": 1000000
      }
    ];

    for (const userData of usersToAdd) {
      try {
        const newUser = await this.order.createOrder(userData);
        if (newUser) {
          console.log(`User with ID ${newUser.id} created successfully`);
        } else {
          console.log('Failed to create user:', userData);
        }
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  }

  // async addUserInfos(this: any) {
  //   const usersToAdd = [
  //     {
  //       "id": 1,
  //       "user_id": 1,
  //       "img1": "Rectangle 16-2.png",
  //       "img2": "Rectangle 17-2.png",
  //       "img3": "Rectangle 18-2.png",
  //       "cost": 300000,
  //       "description": "Tôi đã chụp ảnh cả đời nhưng quyết định chụp ảnh chuyên nghiệp vào năm 2010 và tôi càng yêu thích nó hơn mỗi ngày. Tôi rất là người của mọi người nhưng trớ trêu thay chuyên môn của tôi lại là chụp ảnh sản phẩm, đồ ăn và đồ uống. Chỉ vì tôi chuyên chụp đồ không có nghĩa là tôi thiếu chụp ảnh chân dung, thứ duy nhất tôi không chụp là đám cưới ;)",
  //       "prize": "Nhiếp ảnh gia tài năng khu vực miền Bắc năm 2023",
  //       "interest": "Tôi bị ám ảnh bởi máy ảnh từ khi lên 3 và mẹ tôi đã cho tôi chơi với máy ảnh Polaroid :)",
  //       "language": "Tiếng Việt",
  //       "camera": "Sony A7iii, LUMIX G9, Panasonic GH5",
  //       "portfolio": [],
  //       "typeOfPhoto": [
  //         {
  //           "id": 1,
  //           "name": "Chụp chân dung",
  //           "cost": 500000
  //         },
  //         {
  //           "id": 2,
  //           "name": "Chụp sản phẩm",
  //           "cost": 400000
  //         },
  //         {
  //           "id": 3,
  //           "name": "Chụp cảnh",
  //           "cost": 300000
  //         },
  //         {
  //           "id": 4,
  //           "name": "Chụp sự kiện",
  //           "cost": 800000
  //         },
  //         {
  //           "id": 5,
  //           "name": "Chụp beauty",
  //           "cost": 550000
  //         }
  //       ]
  //     },
  //     {
  //       "id": 2,
  //       "user_id": 2,
  //       "img1": "tú 1.jpg",
  //       "img2": "tú 2.jpg",
  //       "img3": "tú 3.jpg",
  //       "cost": 350000,
  //       "description": "Tôi đã chụp ảnh cả đời nhưng quyết định chụp ảnh chuyên nghiệp vào năm 2010 và tôi càng yêu thích nó hơn mỗi ngày. Tôi rất là người của mọi người nhưng trớ trêu thay chuyên môn của tôi lại là chụp ảnh sản phẩm, đồ ăn và đồ uống. Chỉ vì tôi chuyên chụp đồ không có nghĩa là tôi thiếu chụp ảnh chân dung, thứ duy nhất tôi không chụp là đám cưới ;)",
  //       "prize": "Nhiếp ảnh gia tài năng khu vực miền Bắc năm 2023",
  //       "interest": "Tôi bị ám ảnh bởi máy ảnh từ khi lên 3 và mẹ tôi đã cho tôi chơi với máy ảnh Polaroid :)",
  //       "language": "Tiếng Việt",
  //       "camera": "Sony A7iii, LUMIX G9, Panasonic GH5",
  //       "portfolio": [],
  //       "typeOfPhoto": [
  //         {
  //           "id": 1,
  //           "name": "Chụp chân dung",
  //           "cost": 500000
  //         },
  //         {
  //           "id": 2,
  //           "name": "Chụp sản phẩm",
  //           "cost": 400000
  //         },
  //         {
  //           "id": 3,
  //           "name": "Chụp cảnh",
  //           "cost": 300000
  //         },
  //         {
  //           "id": 4,
  //           "name": "Chụp sự kiện",
  //           "cost": 800000
  //         },
  //         {
  //           "id": 5,
  //           "name": "Chụp beauty",
  //           "cost": 550000
  //         }
  //       ]
  //     },
  //     {
  //       "id": 3,
  //       "user_id": 3,
  //       "img1": "Vũ Đức Tùng 1.jpg",
  //       "img2": "Vũ Đức Tùng 2.jpg",
  //       "img3": "Vũ Đức Tùng 3.jpg",
  //       "cost": 500000,
  //       "description": "Tôi đã chụp ảnh cả đời nhưng quyết định chụp ảnh chuyên nghiệp vào năm 2010 và tôi càng yêu thích nó hơn mỗi ngày. Tôi rất là người của mọi người nhưng trớ trêu thay chuyên môn của tôi lại là chụp ảnh sản phẩm, đồ ăn và đồ uống. Chỉ vì tôi chuyên chụp đồ không có nghĩa là tôi thiếu chụp ảnh chân dung, thứ duy nhất tôi không chụp là đám cưới ;)",
  //       "prize": "Nhiếp ảnh gia tài năng khu vực miền Bắc năm 2023",
  //       "interest": "Tôi bị ám ảnh bởi máy ảnh từ khi lên 3 và mẹ tôi đã cho tôi chơi với máy ảnh Polaroid :)",
  //       "language": "Tiếng Việt",
  //       "camera": "Sony A7iii, LUMIX G9, Panasonic GH5",
  //       "portfolio": [],
  //       "typeOfPhoto": [
  //         {
  //           "id": 1,
  //           "name": "Chụp chân dung",
  //           "cost": 500000
  //         },
  //         {
  //           "id": 2,
  //           "name": "Chụp sản phẩm",
  //           "cost": 400000
  //         },
  //         {
  //           "id": 3,
  //           "name": "Chụp cảnh",
  //           "cost": 300000
  //         },
  //         {
  //           "id": 4,
  //           "name": "Chụp sự kiện",
  //           "cost": 800000
  //         },
  //         {
  //           "id": 5,
  //           "name": "Chụp beauty",
  //           "cost": 550000
  //         }
  //       ]
  //     },
  //     {
  //       "id": 4,
  //       "user_id": 4,
  //       "img1": "Thanh Bình 1.jpg",
  //       "img2": "Thanh Bình 2.jpg",
  //       "img3": "Thanh Bình 3.jpg",
  //       "cost": 300000,
  //       "description": "Tôi đã chụp ảnh cả đời nhưng quyết định chụp ảnh chuyên nghiệp vào năm 2010 và tôi càng yêu thích nó hơn mỗi ngày. Tôi rất là người của mọi người nhưng trớ trêu thay chuyên môn của tôi lại là chụp ảnh sản phẩm, đồ ăn và đồ uống. Chỉ vì tôi chuyên chụp đồ không có nghĩa là tôi thiếu chụp ảnh chân dung, thứ duy nhất tôi không chụp là đám cưới ;)",
  //       "prize": "Nhiếp ảnh gia tài năng khu vực miền Bắc năm 2023",
  //       "interest": "Tôi bị ám ảnh bởi máy ảnh từ khi lên 3 và mẹ tôi đã cho tôi chơi với máy ảnh Polaroid :)",
  //       "language": "Tiếng Việt",
  //       "camera": "Sony A7iii, LUMIX G9, Panasonic GH5",
  //       "portfolio": [
  //         {
  //           "id": 1,
  //           "name": "Chụp chân dung",
  //           "cost": 500000
  //         },
  //         {
  //           "id": 2,
  //           "name": "Chụp sản phẩm",
  //           "cost": 400000
  //         },
  //         {
  //           "id": 3,
  //           "name": "Chụp cảnh",
  //           "cost": 300000
  //         },
  //         {
  //           "id": 4,
  //           "name": "Chụp sự kiện",
  //           "cost": 800000
  //         },
  //         {
  //           "id": 5,
  //           "name": "Chụp beauty",
  //           "cost": 550000
  //         }
  //       ]
  //     },
  //     {
  //       "id": 5,
  //       "user_id": 5,
  //       "img1": "Hy vuông 1.jpg",
  //       "img2": "Hy vuông 2.jpg",
  //       "img3": "Hy vuông 3.jpg",
  //       "cost": 600000,
  //       "description": "Tôi đã chụp ảnh cả đời nhưng quyết định chụp ảnh chuyên nghiệp vào năm 2010 và tôi càng yêu thích nó hơn mỗi ngày. Tôi rất là người của mọi người nhưng trớ trêu thay chuyên môn của tôi lại là chụp ảnh sản phẩm, đồ ăn và đồ uống. Chỉ vì tôi chuyên chụp đồ không có nghĩa là tôi thiếu chụp ảnh chân dung, thứ duy nhất tôi không chụp là đám cưới ;)",
  //       "prize": "Nhiếp ảnh gia tài năng khu vực miền Bắc năm 2023",
  //       "interest": "Tôi bị ám ảnh bởi máy ảnh từ khi lên 3 và mẹ tôi đã cho tôi chơi với máy ảnh Polaroid :)",
  //       "language": "Tiếng Việt",
  //       "camera": "Sony A7iii, LUMIX G9, Panasonic GH5",
  //       "portfolio": [],
  //       "typeOfPhoto": [
  //         {
  //           "id": 1,
  //           "name": "Chụp chân dung",
  //           "cost": 500000
  //         },
  //         {
  //           "id": 2,
  //           "name": "Chụp sản phẩm",
  //           "cost": 400000
  //         },
  //         {
  //           "id": 3,
  //           "name": "Chụp cảnh",
  //           "cost": 300000
  //         },
  //         {
  //           "id": 4,
  //           "name": "Chụp sự kiện",
  //           "cost": 800000
  //         },
  //         {
  //           "id": 5,
  //           "name": "Chụp beauty",
  //           "cost": 550000
  //         }
  //       ]
  //     },
  //     {
  //       "id": 6,
  //       "user_id": 6,
  //       "img1": "Tùng lâm 1.jpg",
  //       "img2": "Tùng lâm 2.jpg",
  //       "img3": "Tùng lâm 3.jpg",
  //       "cost": 300000,
  //       "description": "Tôi đã chụp ảnh cả đời nhưng quyết định chụp ảnh chuyên nghiệp vào năm 2010 và tôi càng yêu thích nó hơn mỗi ngày. Tôi rất là người của mọi người nhưng trớ trêu thay chuyên môn của tôi lại là chụp ảnh sản phẩm, đồ ăn và đồ uống. Chỉ vì tôi chuyên chụp đồ không có nghĩa là tôi thiếu chụp ảnh chân dung, thứ duy nhất tôi không chụp là đám cưới ;)",
  //       "prize": "Nhiếp ảnh gia tài năng khu vực miền Bắc năm 2023",
  //       "interest": "Tôi bị ám ảnh bởi máy ảnh từ khi lên 3 và mẹ tôi đã cho tôi chơi với máy ảnh Polaroid :)",
  //       "language": "Tiếng Việt",
  //       "camera": "Sony A7iii, LUMIX G9, Panasonic GH5",
  //       "portfolio": [],
  //       "typeOfPhoto": [
  //         {
  //           "id": 1,
  //           "name": "Chụp chân dung",
  //           "cost": 500000
  //         },
  //         {
  //           "id": 2,
  //           "name": "Chụp sản phẩm",
  //           "cost": 400000
  //         },
  //         {
  //           "id": 3,
  //           "name": "Chụp cảnh",
  //           "cost": 300000
  //         },
  //         {
  //           "id": 4,
  //           "name": "Chụp sự kiện",
  //           "cost": 800000
  //         },
  //         {
  //           "id": 5,
  //           "name": "Chụp beauty",
  //           "cost": 550000
  //         }
  //       ]
  //     }
  //   ];

  //   for (const userData of usersToAdd) {
  //     try {
  //       const newUser = await this.userService.createUserInfo(userData);
  //       if (newUser) {
  //         console.log(`User with ID ${newUser.id} created successfully`);
  //       } else {
  //         console.log('Failed to create user:', userData);
  //       }
  //     } catch (error) {
  //       console.error('Error creating user:', error);
  //     }
  //   }
  // }

  // async addUsers(this: any) {
  //   const usersToAdd = [
  //     {
  //       "id": 1,
  //       "username": "pvc@gmail.com",
  //       "password": "123456",
  //       "full_name": "Phạm Việt Cường",
  //       "avatar": "avatar1.jpeg",
  //       "email": "pvc@gmail.com",
  //       "phone_number": "123-456-7890",
  //       "address": "123 Main St",
  //       "role_id": 2
  //     },
  //     {
  //       "id": 2,
  //       "username": "ldc@example.com",
  //       "password": "123456",
  //       "full_name": "Lê Đức Chinh",
  //       "avatar": "tú.jpg",
  //       "email": "ldc@gmail.com",
  //       "phone_number": "987-654-3210",
  //       "address": "456 Elm St",
  //       "role_id": 2
  //     },
  //     {
  //       "id": 3,
  //       "username": "dtv@gmail.com",
  //       "password": "123456",
  //       "full_name": "Dương Tùng Vương",
  //       "avatar": "Vũ Đức Tùng.jpg",
  //       "email": "dtv@gmail.com",
  //       "phone_number": "555-555-5555",
  //       "address": "789 Oak St",
  //       "role_id": 2
  //     },
  //     {
  //       "id": 4,
  //       "username": "thanh@gmail.com",
  //       "password": "123456",
  //       "full_name": "Thanh Bình",
  //       "avatar": "Thanh Bình.jpg",
  //       "email": "thanh@gmail.com",
  //       "phone_number": "555-555-5555",
  //       "address": "789 Oak St",
  //       "role_id": 2
  //     },
  //     {
  //       "id": 5,
  //       "username": "hyv@example.com",
  //       "password": "123456",
  //       "full_name": "Hi Vuông",
  //       "avatar": "Hy vuông.jpg",
  //       "email": "hyv@gmail.com",
  //       "phone_number": "555-555-5555",
  //       "address": "789 Oak St",
  //       "role_id": 2
  //     },
  //     {
  //       "id": 6,
  //       "username": "ntlam@gmail.com",
  //       "password": "123456",
  //       "full_name": "Phạm Thịnh",
  //       "avatar": "Tùng lâm.jpg",
  //       "email": "ntlam@gmail.com",
  //       "phone_number": "555-555-5555",
  //       "address": "789 Oak St",
  //       "role_id": 2
  //     },
  //     {
  //       "id": 7,
  //       "username": "mhuong@gmail.com",
  //       "password": "123456",
  //       "full_name": "Nguyen Thi Mai Huong",
  //       "avatar": "avatar1.jpeg",
  //       "email": "mhuong@gmail.com",
  //       "phone_number": "123-456-7890",
  //       "address": "123 Main St",
  //       "role_id": 1
  //     }
  //   ];

  //   for (const userData of usersToAdd) {
  //     try {
  //       const newUser = await this.userService.createUser(userData);
  //       if (newUser) {
  //         console.log(`User with ID ${newUser.id} created successfully`);
  //       } else {
  //         console.log('Failed to create user:', userData);
  //       }
  //     } catch (error) {
  //       console.error('Error creating user:', error);
  //     }
  //   }
  // }


}
