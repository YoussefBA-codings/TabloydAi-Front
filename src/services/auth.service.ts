import Router from 'next/router';

import { DB } from '@SRC/services/db.service';
import { User } from '@ROOT/@types/user';
import { UnauthorizedException, NotFoundException } from '@SRC/exceptions';
import { exceptionThrower } from '@SRC/exceptions/throwing';

export class AuthService {
  public static getUserConnected(token: string) {
    return DB._get(`/user/token`, { token });
  }

  constructor() {}

  /* REGISTER */
  public static async preRegister(user: object) {
    try {
      return await DB._post(`/pre-registration`, user);
    } catch (error: any) {
      exceptionThrower(error);
    }
  }

  public static async register(
    registrationToken: string,
    verificationCode: string
  ) {
    try {
      return await DB._post(`/registration`, {
        registrationToken,
        verificationCode
      });
    } catch (error: any) {
      exceptionThrower(error);
    }
  }

  /* LOG IN */
  public static async login(userName: string, password: string) {
    try {
      const user: User = await DB._post(`/login`, {
        userName,
        password
      });

      if (user && user.fullName && typeof user.fullName === 'string') {
        user.fullName = JSON.parse(user.fullName);
      }

      return user;
    } catch (error: any) {
      exceptionThrower(error);
    }
  }
}
