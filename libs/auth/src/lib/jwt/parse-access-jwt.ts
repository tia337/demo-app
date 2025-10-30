import { jwtDecode } from 'jwt-decode';

import type { User } from '../user';
import type { AccessJwtPayload } from './access-jwt-payload';

export function parseAccessJwt(token: string): User {
  const { user_name, user_email, exp, groups, picture } =
    jwtDecode<AccessJwtPayload>(token);

  return {
    userName: user_name,
    userEmail: user_email,
    picture,
    groups,
    exp,
  };
}
