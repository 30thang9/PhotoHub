import { Injectable } from '@angular/core';
import { Observable, catchError, combineLatest, map, of } from 'rxjs';
import { UserInfoDTO } from 'src/app/models/userInfoDTO.model';
import { User1Service } from './user1.service';
import { UserInfo1Service } from './user-info1.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoDTO1Service {

  constructor(private userService: User1Service, private userInfoService: UserInfo1Service) { }

  getUserInfoDTOs(): Observable<UserInfoDTO[]> {
    return combineLatest([
      this.userService.getUsers(),
      this.userInfoService.getUserInfos()
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

    return combineLatest([
      this.userService.getUsers(),
      this.userInfoService.getUserInfos()
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

  getUserInfoDTOsById(id: number): Observable<UserInfoDTO | null> {
    return combineLatest([
      this.userService.getUsers(),
      this.userInfoService.getUserInfos()
    ]).pipe(
      map(([users, userInfoList]) => {
        const userInfoDTOs: UserInfoDTO[] = [];
        for (const user of users) {
          const userInfo = userInfoList.find(info => info.user_id === user.id);
          if (userInfo) {
            userInfoDTOs.push({ user, userInfo });
          }
        }
        const foundUserInfoDTO = userInfoDTOs.find(dto => dto.user.id === id);
        return foundUserInfoDTO || null;
      }),
      catchError(error => {
        return of(null);
      })
    );
  }

}
