import z from "zod";

export const Event = z.object({
    title: z.string().min(8),
    location: z.string().min(4),
});

/*
model Event {
  id                Int       @id @default(autoincrement())
  title             String
  location          String
  isTicketAvailable Boolean
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  tickets           Booking[]
}
*/