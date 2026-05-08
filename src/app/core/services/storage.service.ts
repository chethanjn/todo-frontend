import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly tokenKey = 'todo-token';
  private readonly userNameKey = 'todo-username';

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
  setUserName(userName: string) {
    localStorage.setItem(this.userNameKey, userName);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
  getUserName() {
    return localStorage.getItem(this.userNameKey);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  clearAll(){
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userNameKey);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

}
