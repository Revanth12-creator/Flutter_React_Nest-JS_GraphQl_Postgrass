import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
const logger = new Logger();
@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    logger.log( "Authentication Status", req.isAuthenticated());

    return req.isAuthenticated();
  }
}
