
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  status: string;
  lastLogin: string;
  avatar: string;
  department: string;
  joinDate: string;
  actionsThisMonth: number;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  usersCount: number;
  level: string;
  color: string;
}

export interface Permission {
  id: string;
  name: string;
  category: string;
}
