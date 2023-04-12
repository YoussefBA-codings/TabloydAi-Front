import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import axios from 'axios';

import { UserService } from './users.service';
import Router from 'next/router';

const { publicRuntimeConfig } = getConfig();

export class BaseService {
  protected userSubject: BehaviorSubject<any>;

  public get userValue() {
    return this.userSubject.value;
  }

  public get isConnected() {
    return this.userSubject.value && this.userSubject.value.token;
  }

  constructor(userStorage: string | null, localsStorage?: Storage) {
    if (userStorage && !/undefined|null/i.test(userStorage)) {
      this.userSubject = new BehaviorSubject(
        JSON.parse(userStorage as string | '{}')
      );
    } else {
      // Si token invalide
      this.userSubject = new BehaviorSubject({ role: 'anonymous' });
      localsStorage?.removeItem('user');
      // localsStorage?.setItem('user', JSON.stringify({ role: 'anonymous' }));
    }

    this.userSubject.asObservable();
  }

  private authHeader(url: string) {
    const user = this.userValue;
    const isLoggedIn = user && user.token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);

    if (isLoggedIn && isApiUrl)
      return { Authorization: `Bearer ${user.token}` };
    else return {};
  }

  private handleResponse(response: any) {
    const data = response.data;

    // if (!/ok|created|updated|deleted/i.test(response.statusText)) {
    //   if ([401, 403].includes(response.status) && this.userValue) {
    //     // debugger;
    //     // localStorage.removeItem('user');
    //   }

    //   const error = (data && data.message) || response.statusText;
    //   return Promise.reject(error);
    // }

    return data;
  }

  private async sendRequest(url: string, requestOptions: object) {
    try {
      const response = await axios(url, requestOptions);
      return this.handleResponse(response);
    } catch (error: any) {
      debugger;
      if (error?.response?.data?.message) {
        switch (true) {
          case /Token expired/i.test(error.response?.data?.message):
            localStorage.removeItem('user');
            Router.reload();
            break;

          default:
            break;
        }
      }
    }
  }

  // Axios Request
  protected async get(url: string) {
    const requestOptions = {
      method: 'GET',
      headers: this.authHeader(url)
    };
    return await this.sendRequest(url, requestOptions);
  }

  protected async post(url: string, body: object) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...this.authHeader(url) },
      credentials: 'include',
      data: body
    };
    return await this.sendRequest(url, requestOptions);
  }

  protected async put(url: string, body: object) {
    const requestOptions = {
      method: 'PUT',
      // headers: { 'Content-Type': 'application/json' },
      headers: { 'Content-Type': 'application/json', ...this.authHeader(url) },
      body: JSON.stringify(body)
    };
    return await this.sendRequest(url, requestOptions);
  }

  // prefixed with underscored because delete is a reserved word in javascript
  protected async _delete(url: string) {
    const requestOptions = {
      method: 'DELETE'
    };
    return await this.sendRequest(url, requestOptions);
  }
}
