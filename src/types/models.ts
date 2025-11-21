export interface Organization {
  id: string;
  uid: string;
  name: string;
  description: string;
  applicationsCount?: number;
}

export interface Application {
  id: string;
  uid: string;
  name: string;
  description: string;
  uri: string;
  profile: string;
  label: string;
  enabled: boolean;
  vaultUrl: string;
  secretEngine: string;
  vaultToken: string;
  appRoleId: string;
  appRoleSecret: string;
  vaultEnabled: boolean;
  organizationId: string;
  vaultAuthMethod?: string;
  vaultUsername?: string;
  vaultPassword?: string;
  vaultSchema?: string;
  vaultPort?: number;
}

export interface User {
  id: string;
  username: string;
  roles: string[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  editable?: boolean;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  organizationId: string;
  applicationId: string;
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export interface OrganizationUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

