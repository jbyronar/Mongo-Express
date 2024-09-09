export interface userType {
  id: number;
  name: string;
  email: string;
}

export interface AclType {
  id: number;
  name: string;
  accessTo: string
}

export interface UsersRolesType {
  id: number,
  roleId: number,
  userId: number
}

export interface RolesType {
  id: number,
  name: string,
  description: string,
  power: string
}

export interface UsersAclType {
  id: number,
  userId: string,
  aclId: string
}

export interface UsersSettingsType {
  id: number,
  userId: string,
  settings: JSON
}

