import z from "zod";

export const User = z.object({
  password: z.string().min(8),
  email: z.string().email(),
});

export enum ROLES {
  GUEST = "GUEST",
  ADMIN = "ADMIN"
}

export enum AUTH_TYPES {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER"
}