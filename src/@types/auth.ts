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
  roles: Set<Role>;
};

enum Role {
  ROLE_USER = "ROLE_USER",
  ROLE_MODERATOR = "ROLE_MODERATOR",
  ROLE_ADMIN = "ROLE_ADMIN",
}

export type loginResponse = {
  accessToken: string;
  refreshToken: string;
};
