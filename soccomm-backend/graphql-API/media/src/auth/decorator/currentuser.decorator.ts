import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
const logger = new Logger();
export const CurrentUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request);

    const header = request.headers['authorization'];
    const token = header && header.split(' ')[1];

    //if (token == null) return request.sendStatus(401);

    const user: any = await jwt.verify(token, 'JwtSecret');
    logger.log('Current User', JSON.stringify(user));
    return user;
  },
);
