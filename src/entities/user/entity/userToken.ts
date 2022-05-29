export class UserToken {
  data: {
    name: string;
    email: string;
    _id: number;
  };
  roles: string[];
  iat: number;
  exp: number;
}
