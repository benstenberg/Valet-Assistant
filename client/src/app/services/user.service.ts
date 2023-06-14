import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UrlSegmentGroup } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  private URL : string = 'api/v1' 

  getAll() : Observable<User[]> {
    return this.http.get<User[]>(this.URL + '/users');
  }

  create(user : User) : Observable<User> {
    let body = {username: user.username, name: user.name, password: user.password};
    return this.http.post<User>(this.URL + '/users', body);
  }

  delete(uid : String) : Observable<void> {
    return this.http.delete<void>(this.URL + '/uids/' + uid );
  }

  getById(uid : String) : Observable<User> {
    return this.http.get<User>(this.URL + '/uids/' + uid);
  }

  update(user : User) : Observable<User> {
    return this.http.post<User>(this.URL + '/uids/' + user._id, user);
  }

}
