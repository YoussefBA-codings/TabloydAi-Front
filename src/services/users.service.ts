import { DB } from '@SRC/services/db.service';

export class UserService {
  constructor() {}

  public static async getAll() {
    return await DB._get(`/users`);
  }

  public static async getByUserName(userName: string) {
    return await DB._get(`/user/${userName}`);
  }

  public static async deleteByUserName(userName: string) {
    return await DB._delete(`/user/${userName}`);
  }
}
