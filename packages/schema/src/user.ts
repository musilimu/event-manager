import z from "zod";

export const User = z.object({
  password: z.string().min(8),
  email: z.string().email(),
});