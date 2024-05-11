export interface auth {
  roles: string[];
  username: string;
  accessToken: string;
}

export type loginRequest = {
  username: string;
  password: string;
};

export type registerRequest = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  role: Set<Role>;
};

enum Role {
  ROLE_USER = "ROLE_USER",
  ROLE_MODERATOR = "ROLE_MODERATOR",
  ROLE_ADMIN = "ROLE_ADMIN",
}

export type loginResponse = {
  access_token: string;
  refresh_token: string;
  role: string[];
  username: string;
};
