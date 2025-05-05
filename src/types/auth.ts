export interface UserInfo {
  id: number;
  username: string;
  roles: string[];
}

export interface AuthResponse {
  token: string;
  userInfo: UserInfo;
}