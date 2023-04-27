import { User } from '@TYPES/user';

declare module 'next-auth' {
  interface Session {
    user: User;
  }
}
