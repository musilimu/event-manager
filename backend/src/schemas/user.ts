import z from "zod";
export const User = z.object({
	password: z.string(),
	email: z.number(),
});
