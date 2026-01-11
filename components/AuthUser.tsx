"use client";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState, useActionState, useEffect } from "react";
import { CompleteProfile, UpdateProfile, AuthState } from "@/app/actions/auth.actions";
import { AuthSchema, AuthType } from "@/schemas/auth.schema";
import { flattenError } from "zod";
import { startTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AuthUser({ usage }: { usage: "complete" | "update" }) {
    const [formData, setFormData] = useState<AuthType>({
        username: "",
    });

    const router = useRouter();

    const [error, setError] = useState<{ username?: string[] }>({});

    const initialState: AuthState = {
        success: false,
        message: "",
        error: {},
    };

    const [state, action, isPending] = useActionState<AuthState, AuthType>(usage === "complete" ? CompleteProfile : UpdateProfile, initialState);

    // server side validation response handling
    useEffect(() => {
        if (!state) return;
        const { success, error, message } = state;
        if (!success) {
            if (error) {
                // this will show the error in the form
                setError(error);
                return;
            }
            if (message) {
                toast.error(message);
                return;
            }
        }
        toast.success(message);
        if (usage === "complete") {
            router.refresh();
        } else {
            router.push("/dashboard");
        }
    }, [state]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Client-side validation
        const result = AuthSchema.safeParse(formData);
        if (!result.success) {
            return setError(flattenError(result.error).fieldErrors);
        }

        startTransition(() => {
            action(formData);
        });
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
                        <h1 className="text-xl font-bold">{usage === "complete" ? "Welcome to True Feedback." : "Update Your Username"}</h1>
                        <FieldDescription>{usage === "complete" ? "Choose a unique username to get started." : "Choose a unique username to update your profile."}</FieldDescription>
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
                            {usage === "complete" ? (isPending ? "Completing..." : "Complete Profile") : isPending ? "Updating..." : "Update Profile"}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
}
