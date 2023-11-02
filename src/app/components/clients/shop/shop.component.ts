import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';
import { UserInfo } from 'src/app/models/userInfo.model';
import { UserInfoDTO } from 'src/app/models/userInfoDTO.model';
import { UserInfoDTOService } from 'src/app/services/user-info-dto.service';
import { UserInfoDTO1Service } from 'src/app/services/demo/user-info-dto1.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  userInfoData: UserInfoDTO[] = [];
  userCount: number = 0;
  constructor(private userInfoDTOService: UserInfoDTO1Service) { }

  ngOnInit() {
    this.loadUserInfoData();
  }

  loadUserInfoData() {
    this.userInfoDTOService.getUserInfoDTOsByRole(2).subscribe(
      (data: UserInfoDTO[]) => {
        this.userInfoData = data;
        this.userCount = this.userInfoData.length;
      },
      (error) => {
        console.error('Error fetching user information: ', error);
      }
    );
  }
}
