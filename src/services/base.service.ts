import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import axios, { AxiosInstance } from 'axios';

import { UserService } from '@/services';
import { config } from 'process';

const { publicRuntimeConfig } = getConfig();
const token =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlOTczZWUwZTE2ZjdlZWY0ZjkyMWQ1MGRjNjFkNzBiMmVmZWZjMTkiLCJ0eXAiOiJKV1QifQ.eyJleHBpcmVzSW4iOjEsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS90YWJsb3lkYWkiLCJhdWQiOiJ0YWJsb3lkYWkiLCJhdXRoX3RpbWUiOjE2Nzg5MDcwNTEsInVzZXJfaWQiOiIwMDI4YTI1YS03MzdhLTQyNGEtOWVlYy1mYTViZDA0NDE0ZjgiLCJzdWIiOiIwMDI4YTI1YS03MzdhLTQyNGEtOWVlYy1mYTViZDA0NDE0ZjgiLCJpYXQiOjE2Nzg5MDcwNTEsImV4cCI6MTY3ODkxMDY1MSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6e30sInNpZ25faW5fcHJvdmlkZXIiOiJjdXN0b20ifX0.Q3oW_pmC0Vyt3In20l9vrhV9gE4jTwWdkshXhIqNcE2Z3XZvStFRTnTT7EnlAi3Js06lY4Bo0CnSZ6GsT02EQtPnUnB_aX2uVh1RWwMiV-8aZWjZUYmOcGsmXak0Ewecw74V6i_OWfrqt6ZC_elRR3ECIWQQ6M3Msy5RT3aE3zp_eF9S0CfQP0Y50nSa9tgcGONGOq_fRD6VKFplcXgrYFANFzfs9j9AM6xyu9RlzcqYd8F9-FBhvWbD5Iqx8T6cXNdf-w92WxjUErn64OsTPudWd8Yac_Mvc6Kx3YWvMxLbnV7CcAr_aS19Hqt9hBuzfSkv72Fc5bvqEEZZpSQctQ';

export class BaseService {
  // private axiosInstance: AxiosInstance;
  protected static userSubject = new BehaviorSubject(
    typeof window !== 'undefined' &&
      JSON.parse(localStorage.getItem('user') as string | '')
  );

  protected userSubject = BaseService.userSubject;

  public get userValue() {
    return this.userSubject.value;
  }
  constructor() {
    // this.axiosInstance = axios.create({
    //   baseURL: publicRuntimeConfig.apiUrl,
    //   headers: {
    //     Authorization: this.userValue.token
    //       ? `Bearer ${this.userValue.token}`
    //       : ''
    //   }
    // });
    // this.axiosInstance.interceptors.response.use(
    //   (res) => {
    //     console.log(res);
    //     return res;
    //   },
    //   (error) => {
    //     console.log(error);
    //     return Promise.reject(error);
    //   }
    // );
  }

  private authHeader(url: string) {
    const user = this.userValue;
    const isLoggedIn = user && token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);

    if (isLoggedIn && isApiUrl) return { Authorization: `Bearer ${token}` };
    // return { Authorization: `Bearer ${user.token}` };
    else return {};
  }

  private handleResponse(response: any) {
    return response.text().then((text: string) => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        if ([401, 403].includes(response.status) && this.userValue)
          UserService.logout(); // auto logout if 401 Unauthorized or 403 Forbidden response returned from api

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    });
  }

  // Axios Request
  protected get(url: string) {
    const requestOptions = {
      method: 'GET',
      headers: this.authHeader(url)
    };
    return axios(url, requestOptions).then(this.handleResponse);
  }

  protected post(url: string, body: object) {
    const requestOptions = {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      headers: { 'Content-Type': 'application/json', ...this.authHeader(url) },
      credentials: 'include',
      body: JSON.stringify(body)
    };
    return axios(url, requestOptions).then(this.handleResponse);
  }

  protected put(url: string, body: object) {
    const requestOptions = {
      method: 'PUT',
      // headers: { 'Content-Type': 'application/json' },
      headers: { 'Content-Type': 'application/json', ...this.authHeader(url) },
      body: JSON.stringify(body)
    };
    return axios(url, requestOptions).then(this.handleResponse);
  }

  // prefixed with underscored because delete is a reserved word in javascript
  protected _delete(url: string) {
    const requestOptions = {
      method: 'DELETE'
    };
    return axios(url, requestOptions).then(this.handleResponse);
  }
}
