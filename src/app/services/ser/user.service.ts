import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'https://photohub-backend.onrender.com/users';
    private rolesUrl = 'https://photohub-backend.onrender.com/roles';
    private cachedUsers: User[] | null = null;

    constructor(private http: HttpClient) { }

    getRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(this.rolesUrl);
    }

    getUsers(): Observable<User[]> {
        if (this.cachedUsers) {
            return of(this.cachedUsers);
        } else {
            return this.http.get<User[]>(this.apiUrl).pipe(
                tap(users => this.cachedUsers = users),
                catchError(error => {
                    return throwError('Unable to fetch users data');
                })
            );
        }
    }

    getUserById(id: number): Observable<User | null> {
        return this.getUsers().pipe(
            map((users: User[]) => users.find(user => user.id === id) || null)
        );
    }

    getUserByUsername(username: string): Observable<User | null> {
        return this.getUsers().pipe(
            map((users: User[]) => users.find(user => user.username === username) || null)
        );
    }

    isUsernameExists(username: string): Observable<boolean> {
        return this.getUsers().pipe(
            map((users: User[]) => users.some(user => user.username === username))
        );
    }

    addUser(user: User): Observable<User | null> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.isUsernameExists(user.username).pipe(
            switchMap(usernameExists => {
                if (usernameExists) {
                    console.error('Username already exists:', user.username);
                    return of(null);
                } else {
                    user.id = this.incrementUserId();

                    return this.http.post(this.apiUrl, user, { headers }).pipe(
                        catchError((error) => {
                            console.error('Error adding user:', error);
                            return of(null);
                        }),
                        tap(() => {
                            if (this.cachedUsers) {
                                this.cachedUsers.push(user);
                            }
                        })
                    );
                }
            })
        ) as Observable<User | null>;
    }

    updateUser(user: User): Observable<User | null> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.put<User>(`${this.apiUrl}/${user.id}`, user, { headers }).pipe(
            catchError((error) => {
                console.error('Error updating user:', error);
                return of(null);
            }),
            tap(updatedUser => {
                if (updatedUser) {
                    if (this.cachedUsers) {
                        const index = this.cachedUsers.findIndex(u => u.id === updatedUser.id);
                        if (index !== -1) {
                            this.cachedUsers[index] = updatedUser;
                        }
                    }
                } else {
                    console.error('User update failed');
                }
            })
        );
    }


    private incrementUserId(): number {
        const maxId = this.cachedUsers
            ? Math.max(...this.cachedUsers.map(user => user.id), 0)
            : 0;
        return maxId + 1;
    }
}
