export interface UserPermission {
  organizationId: number;
  organizationName: string;
  applicationId: number;
  applicationName: string;
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export interface UserInfo {
  id: number;
  username: string;
  roles: string[];
  permissions: UserPermission[];
  admin: boolean;
}

export interface AuthResponse {
  token: string;
  userInfo: UserInfo;
}