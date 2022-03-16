
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';


import * as jwt from 'jsonwebtoken';
import { Logger, Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ROLES_KEY } from '../decorators/role.decorator';
import { Role } from '../roles';
import { JwtSecret } from '../strategy/jwt-auth.strategy';
const logger = new Logger();
@Injectable()
export class GqlRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean>  {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const requset = ctx.getContext().req;
    const authHeader = requset.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return requset.sendStatus(401);

    const user: any = jwt.verify(token, JwtSecret);
    logger.log( "Role", JSON.stringify(user));

    //const { user }: { user: User } = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
