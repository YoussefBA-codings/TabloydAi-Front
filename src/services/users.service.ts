import { BehaviorSubject } from 'rxjs';
import Router from 'next/router';
import getConfig from 'next/config';

import { BaseService } from '@/services/base.service';
const { publicRuntimeConfig } = getConfig();

// const userSubject = new BehaviorSubject(
//   typeof window !== 'undefined' &&
//     JSON.parse(localStorage.getItem('user') as string | '')
// );

export class UserService extends BaseService {
  private baseUrl = `${publicRuntimeConfig.apiUrl}/user`;
  // private user = userSubject.asObservable();

  // public get userValue() {
  //   return userSubject.value;
  // }

  constructor() {
    super();
  }
  public login(username: string, password: string) {
    return super
      .post(`${this.baseUrl}/authenticate`, {
        username,
        password
      })
      .then((user) => {
        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));

        return user;
      });
  }

  public static logout() {
    localStorage.removeItem('user');
    BaseService.userSubject.next(null);
    Router.push('/account/login');
  }

  public register(user: object) {
    return super.post(`${this.baseUrl}/register`, user);
  }

  public getAll() {
    return super.get(`${this.baseUrl}s`);
  }

  public getById(id: string | number) {
    return super.get(`${this.baseUrl}/${id}`);
  }

  // public  update(id: string | number, params: object) {
  //   return super.put(`${this.baseUrl}/${id}`, params).then((x) => {
  //     // update stored user if the logged in user updated their own record
  //     if (id === userSubject.value.id) {
  //       // update local storage
  //       const user = { ...userSubject.value, ...params };
  //       localStorage.setItem('user', JSON.stringify(user));

  //       // publish updated user to subscribers
  //       userSubject.next(user);
  //     }
  //     return x;
  //   });
  // }

  public _delete(id: string | number) {
    return super._delete(`${this.baseUrl}/${id}`);
  }
}
