import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../shared/models/user.model';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3001/api/user', user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post('http://localhost:3001/api/login', credentials);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3001/api/users');
  }

  countUsers(): Observable<number> {
    return this.http.get<number>('http://localhost:3001/api/users/count');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3001/api/user', user);
  }

  getUser(user: User): Observable<User> {
    return this.http.get<User>(`http://localhost:3001/api/user/${user._id}`);
  }

  editUser(user: User): Observable<any> {
    return this.http.put(`http://localhost:3001/api/user/${user._id}`, user, { responseType: 'text' });
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete(`http://localhost:3001/api/user/${user._id}`, { responseType: 'text' });
  }

}
