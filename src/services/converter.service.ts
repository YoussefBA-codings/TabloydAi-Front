import { DB } from '@SRC/services/db.service';

export class ConverterService {
  constructor() {}

  public static async convert(body: any, options?: any) {
    return DB._post('/upload', body, options);
  }
}
