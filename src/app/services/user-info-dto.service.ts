import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserInfoDTO } from '../models/userInfoDTO.model';
import { UserInfoService } from './user-info.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoDTOService {
  private cachedUserInfoDTOs: UserInfoDTO[] | null = null;

  constructor(private userService: UserService, private userInfoService: UserInfoService) { }

  getUserInfoDTOs(): Observable<UserInfoDTO[]> {
    if (this.cachedUserInfoDTOs) {
      return of(this.cachedUserInfoDTOs);
    }

    return combineLatest([
      this.userService.getUsers(),
      this.userInfoService.getAllUserInfo()
    ]).pipe(
      map(([users, userInfoList]) => {
        const userInfoDTOs: UserInfoDTO[] = [];
        for (const user of users) {
          const userInfo = userInfoList.find(info => info.user_id === user.id);
          if (userInfo)
            userInfoDTOs.push({ user, userInfo });
        }
        return userInfoDTOs;
      }),
      catchError(error => {
        return [];
      })
    );
  }

  getUserInfoDTOsByRole(roleId: number): Observable<UserInfoDTO[]> {
    if (this.cachedUserInfoDTOs) {
      return of(this.cachedUserInfoDTOs);
    }

    return combineLatest([
      this.userService.getUsers(),
      this.userInfoService.getAllUserInfo()
    ]).pipe(
      map(([users, userInfoList]) => {
        const userInfoDTOs: UserInfoDTO[] = [];
        for (const user of users) {
          const userInfo = userInfoList.find(info => info.user_id === user.id && user.role_id === roleId);
          if (userInfo) {
            userInfoDTOs.push({ user, userInfo });
          }
        }
        return userInfoDTOs;
      }),
      catchError(error => {
        return [];
      })
    );
  }

}
