export interface auth {
  roles: string[];
  username: string;
  accessToken: string;
}

export type loginRequest = {
  username: string;
  password: string;
};

export interface RegisterInputs {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  roles: Role[];
}

export interface RegisterRequestBody {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  roles: Role[];
}

export enum Role {
  ROLE_USER = "ROLE_USER",
  ROLE_MODERATOR = "ROLE_MOD",
  ROLE_ADMIN = "ROLE_ADMIN",
}

export type loginResponse = {
  access_token: string;
  refresh_token: string;
  role: string[];
  username: string;
};
