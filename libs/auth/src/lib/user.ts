export interface User {
  readonly userName: string;
  readonly userEmail: string;
  readonly picture: string;
  readonly groups: readonly string[];
  readonly exp: number; // unix;
}
