import Router from 'next/router';
import getConfig from 'next/config';

import { BaseService } from '@/services/base.service';
const { publicRuntimeConfig } = getConfig();

export class UserService extends BaseService {
  private baseUrl = `${publicRuntimeConfig.apiUrl}`;

  constructor(userStorage: string | null, localStorage?: Storage) {
    super(userStorage, localStorage);
  }

  public async login(userName: string, password: string) {
    const user = await super
      .post(`${this.baseUrl}/login`, {
        userName,
        password
      })
      .catch((error) => {
        throw error.response;
      });

    if (user && user.fullName) {
      user.fullName = JSON.parse(user.fullName);
    }

    this.userSubject.next(user);
    console.log('us.login()', user);
    localStorage.setItem('user', JSON.stringify(user));

    // debugger;
    // window.history;
    Router.back();
    // Router.push({
    //   pathname: `/`
    // });

    // return user;
  }

  public logout() {
    this.userSubject.next(null);
    localStorage.removeItem('user');
    // Router.push('/account/signin', undefined, { shallow: true });
    Router.reload();
  }

  public async preRegister(user: object) {
    return await super
      .post(`${this.baseUrl}/pre-registration`, user)
      .catch((error) => {
        throw error.response;
      });
  }
  public async register(registrationToken: string, verificationCode: string) {
    return await super
      .post(`${this.baseUrl}/registration`, {
        registrationToken,
        verificationCode
      })
      .catch((error) => {
        throw error.response;
      });
  }

  public getConnectedUser() {
    const user = this.userValue;
    return super.get(`${this.baseUrl}/user/${user.userName}`);
  }

  public getAll() {
    return super.get(`${this.baseUrl}/users`);
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
