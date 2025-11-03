import type { JwtPayload } from 'jwt-decode';

export interface AccessJwtPayload extends JwtPayload {
  readonly email: string;
  readonly user_name: string;
  readonly user_email: string;
  readonly picture: string;
  readonly groups: readonly string[];
  readonly exp: number; // unix
  readonly user_id: `${number}`;
}
