import { z } from "zod";

export const UpdateProfileSchema = z.object({
    username: z
        .string()
        .regex(/^(?![._])(?!.*[._]{2})[a-z._]+(?<![._])$/, "Username can contain lowercase letters, dots and underscores only")
        .min(3, "Username must be at least 3 characters long")
        .max(16, "Username must be at most 16 characters long"),
});

export type UpdateProfileType = z.infer<typeof UpdateProfileSchema>;
