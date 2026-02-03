"use client";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UpdateProfileSchema, UpdateProfileType } from "@/schemas/profile.schema";
import { UpdateProfile } from "@/app/actions/profile.action";
import { flattenError } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";

export function UpdateProfileForm({ username }: { username: string | null | undefined }) {
    const router = useRouter();

    const [formData, setFormData] = useState<UpdateProfileType>({
        username: username || "",
    });
    const [error, setError] = useState<{ username?: string[] }>({});
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Client-side validation
        const result = UpdateProfileSchema.safeParse(formData);
        if (!result.success) {
            return setError(flattenError(result.error).fieldErrors);
        }

        // calling the action function
        setIsPending(true);
        const res = await UpdateProfile(result.data);
        setIsPending(false);
        if (!res.success) {
            if (res.error) {
                setError(res.error);
            }
            if (res.message) {
                toast.error(res.message);
            }
            return;
        }

        toast.success(res.message);
        router.push("/dashboard");
    };

    return (
        <div className={cn("flex flex-col gap-6")}>
            <form onSubmit={handleSubmit}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <a href="#" className="flex flex-col items-center gap-2 font-medium">
                            <div className="flex size-8 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-6" />
                            </div>
                            <span className="sr-only">True Feedback.</span>
                        </a>
                        <h1 className="text-xl font-bold">Update Your Username</h1>
                        <FieldDescription>Choose a unique username to update your profile.</FieldDescription>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="username">Username</FieldLabel>
                        <Input
                            id="username"
                            type="text"
                            placeholder="username"
                            value={formData.username}
                            onChange={(e) => {
                                setFormData({ ...formData, username: e.target.value });
                                setError({});
                            }}
                            required
                        />

                        {error?.username &&
                            error?.username.map((error, index) => (
                                <FieldDescription className="text-destructive" key={index}>
                                    {error}
                                </FieldDescription>
                            ))}
                    </Field>
                    {error?.username && <FieldSeparator />}
                    <Field>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <>
                                    Updating... <Spinner />
                                </>
                            ) : (
                                "Update Profile"
                            )}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
}
