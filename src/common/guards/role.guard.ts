import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorators';
import { UserRole } from '../enum/roles.enum';
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());
        if (!requiredRoles || requiredRoles.length === 0) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) throw new ForbiddenException('No user attached to request');

        if (!requiredRoles.includes(user.role)) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return true;
    }
}
