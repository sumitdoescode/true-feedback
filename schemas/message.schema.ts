import { z } from "zod";

export const MessageSchema = z.object({
    content: z.string().min(5, "Message must be at least 5 characters long").max(1000, "Message must be at most 1000 characters long"),
    to: z.string().min(1, "To is required").max(16, "To must be at most 16 characters long"),
});

export type MessageType = z.infer<typeof MessageSchema>;
