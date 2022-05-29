import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserToken } from 'src/entities/user/entity/userToken';

import { AppResponseDto } from '../shared/dto/app-response.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');

export const AuthUser = createParamDecorator((a, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const auth = req.headers.authorization;
  const user = jwt.decode(auth.split(' ')[1]);
  return user as UserToken;
});
