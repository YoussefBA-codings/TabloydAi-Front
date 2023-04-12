interface FullName {
  lastName: string;
  firstName: string;
}

export interface User {
  token?: string;
  id: string;
  userName: string;
  fullName?: string;
  email: string;
  role?: string;
  conversionToken?: number;
  isDesactivate?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
