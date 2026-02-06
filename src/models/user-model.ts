export interface UserModel {
  id: number;
  email: string;
  password: string;
  name: string;
  // role: string;
  isActive: boolean;
  emailVerifiedAt: Date;
  createdAt: Date;
  roles: string[];
}