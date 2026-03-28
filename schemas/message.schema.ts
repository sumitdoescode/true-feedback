import { z } from "zod";

export const SendMessageSchema = z.object({
    content: z.string().min(5, "Message must be at least 5 characters long").max(1000, "Message must be at most 1000 characters long"),
    to: z.string().min(1, "Username is required"),
});

export type SendMessageType = z.infer<typeof SendMessageSchema>;
