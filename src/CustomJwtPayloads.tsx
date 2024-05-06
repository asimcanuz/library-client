import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayloads extends JwtPayload {
  role?: string[];
}
