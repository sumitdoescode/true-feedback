import { z } from "zod";

export const CompleteProfileSchema = z.object({
    username: z
        .string()
        .regex(/^(?![._])(?!.*[._]{2})[a-z._]+(?<![._])$/, "Username can contain lowercase letters, dots and underscores only")
        .min(3, "Username must be at least 3 characters long")
        .max(16, "Username must be at most 16 characters long"),
});

// working ?

export type CompleteProfileType = z.infer<typeof CompleteProfileSchema>;
