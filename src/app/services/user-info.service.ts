import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UserInfo } from '../models/userInfo.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private apiUrl = 'https://photohub-backend.onrender.com/user_info';
  private cachedUserInfo: UserInfo[] | null = null;

  constructor(private http: HttpClient) { }

  getAllUserInfo(): Observable<UserInfo[]> {
    if (this.cachedUserInfo) {
      return of(this.cachedUserInfo);
    } else {
      return this.http.get<UserInfo[]>(this.apiUrl).pipe(
        tap(userInfo => this.cachedUserInfo = userInfo),
        catchError(error => {
          return throwError('Unable to fetch user information');
        })
      );
    }
  }

  getUserInfoById(id: number): Observable<UserInfo | null> {
    return this.getAllUserInfo().pipe(
      map((userInfo: UserInfo[]) => userInfo.find(info => info.id === id) || null)
    );
  }

  addUser(user: UserInfo): Observable<UserInfo | null> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<UserInfo | null>(this.apiUrl, user, { headers }).pipe(
      catchError((error) => {
        console.error('Error adding user:', error);
        return of(null);
      }),
      tap(() => {
        if (this.cachedUserInfo) {
          this.cachedUserInfo.push(user);
        }
      })
    );
  }

  updateUserInfo(userInfo: UserInfo): Observable<UserInfo | null> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<UserInfo>(`${this.apiUrl}/${userInfo.id}`, userInfo, { headers }).pipe(
      catchError((error) => {
        console.error('Error updating user information:', error);
        return of(null);
      }),
      tap(updatedUserInfo => {
        if (updatedUserInfo) {
          if (this.cachedUserInfo) {
            const index = this.cachedUserInfo.findIndex(info => info.id === updatedUserInfo.id);
            if (index !== -1) {
              this.cachedUserInfo[index] = updatedUserInfo;
            }
          }
        } else {
          console.error('User information update failed');
        }
      })
    );
  }

}
