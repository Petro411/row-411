import { HttpException } from "@/utils/HttpException";
import { label } from "@/branding";

import { Permission } from "../../../types/permissions";


// Map HTTP methods to permission types
const methodToPermissionMap: Record<string, Permission> = {
  GET: Permission.READ,
  POST: Permission.CREATE,
  PUT: Permission.UPDATE,
  PATCH: Permission.UPDATE,
  DELETE: Permission.DELETE,
};

export const withRoleAuth = (handler: any, allowedRoles: string[]) => {
  return async (req: any, res: any) => {
    try {
      const user = req.user;

      if (!user) {
        throw new HttpException(label.UserNotFound, 404);
      }

      if (!allowedRoles.includes(user.role)) {
        throw new HttpException(label.DontHavePermissions, 403);
      }

      const requiredPermission = methodToPermissionMap[req.method];

      if (requiredPermission && !user.permissions.includes(requiredPermission)) {
        throw new HttpException(label.DontHavePermissions, 403);
      }

      return handler(req, res);
    } catch (error: any) {
      return res.status(error?.statusCode ?? 500).json({
        success: false,
        status: error?.statusCode ?? 500,
        message: error?.message || label.InternalServerError,
      });
    }
  };
};
