import z from "zod";

export const Event = z.object({
	title: z.string().min(8),
	location: z.string().min(4),
});
