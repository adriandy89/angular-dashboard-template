export interface IUser {
  id: string;
  username: string;
  role: IRole;
  tags?: string[];
}

export interface ILoginUser {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IRegisterUser {
  username: string;
  password: string;
}

export type IRole = 'user' | 'root';
