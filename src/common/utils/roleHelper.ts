import { UserRole } from "../enum/roles.enum";

export function assignRoleBasedOnEmail(email: string): UserRole {
  const adminEmails = ['admin@shop.edu'];   
  const superAdminEmails = ['superadmin@shop.edu']; 

  if (superAdminEmails.includes(email.toLowerCase())) {
    return UserRole.SUPER_ADMIN;
  }

  if (adminEmails.includes(email.toLowerCase())) {
    return UserRole.ADMIN;
  }

  return UserRole.CUSTOMER;
}
