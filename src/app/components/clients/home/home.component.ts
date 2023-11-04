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

  constructor(private userInfoDTOService: UserInfoDTO1Service) { }
  userInfoData: UserInfoDTO[] = [];
  ngOnInit(): void {
    this.loadUserInfoData();
  }

  loadUserInfoData() {
    this.userInfoDTOService.getUserInfoDTOsByRole(2).subscribe(
      (data: UserInfoDTO[]) => {
        this.userInfoData = data;
        // this.userCount = this.userInfoData.length;
      },
      (error) => {
        console.error('Error fetching user information: ', error);
      }
    );
  }
}
