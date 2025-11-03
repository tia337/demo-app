import { jwtDecode } from 'jwt-decode';

import type { AccessJwtPayload } from './access-jwt-payload';

export function parseAccessJwt(token: string): AccessJwtPayload {
  return jwtDecode<AccessJwtPayload>(token)
}
