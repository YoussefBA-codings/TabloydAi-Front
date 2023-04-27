import axios from 'axios';
import { getSession } from 'next-auth/react';

export class DB {
  private static baseURL: string =
    process.env.NODE_ENV === 'production'
      ? 'http://localhost:3000/api'
      : 'http://localhost:3000/api';

  constructor() {}

  private static async authHeader(options?: any) {
    const session = await getSession();

    const user = options?.user || session?.user;
    const isLoggedIn = user && user.token;

    if (isLoggedIn) return { Authorization: `Bearer ${user.token}` };
    else return {};
  }

  private static handleResponse(error?: any, response?: any) {
    if (error) {
      return error;
    } else {
      const data = response.data;
      return data;
    }
  }

  private static async sendRequest(url: string, requestOptions: object) {
    try {
      debugger;
      const response = await axios(`${DB.baseURL}${url}`, {
        ...requestOptions
      });
      return this.handleResponse(null, response);
    } catch (error: any) {
      throw this.handleResponse(error);
    }
  }

  /* ### Axios Request ### */
  public static async _get(url: string, options?: any) {
    const requestOptions = {
      method: 'GET',
      headers: await this.authHeader(options)
    };
    return await this.sendRequest(url, requestOptions);
  }

  public static async _post(url: string, body: object, options?: any) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': /upload/i.test(url)
          ? 'multipart/form-data'
          : 'application/json',
        ...(await this.authHeader(options))
      },
      credentials: 'include',
      data: body
    };
    return await this.sendRequest(url, requestOptions);
  }

  public static async _put(url: string, body: object, options?: any) {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(await this.authHeader(options))
      },
      body: JSON.stringify(body)
    };
    return await this.sendRequest(url, requestOptions);
  }

  public static async _delete(url: string, options?: any) {
    const requestOptions = {
      method: 'DELETE',
      headers: await this.authHeader(options)
    };
    return await this.sendRequest(url, requestOptions);
  }
}
