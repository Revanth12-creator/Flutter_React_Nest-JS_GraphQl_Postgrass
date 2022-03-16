import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Role } from 'src/user/roles';
import { ROLES_KEY } from '../decorator/role.decorator';
import * as jwt from 'jsonwebtoken';
import { JwtSecret } from '../jwt/jwt-auth.strategy';
const logger = new Logger();
@Injectable()
export class GqlRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
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
