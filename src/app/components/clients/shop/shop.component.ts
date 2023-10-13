import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';
import { UserInfo } from 'src/app/models/userInfo.model';
import { UserInfoDTO } from 'src/app/models/userInfoDTO.model';
import { UserInfoDTOService } from 'src/app/services/user-info-dto.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  userInfoData: UserInfoDTO[] = [];

  constructor(private userInfoDTOService: UserInfoDTOService) { }

  ngOnInit() {
    this.loadUserInfoData();
  }

  loadUserInfoData() {
    this.userInfoDTOService.getUserInfoDTOs().subscribe(
      (data: UserInfoDTO[]) => {
        this.userInfoData = data;
      },
      (error) => {
        console.error('Error fetching user information: ', error);
      }
    );
  }
}
