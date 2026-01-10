"use client";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { flattenError } from "zod";
import { useState, useActionState, useEffect } from "react";
import { CompleteProfileSchema, CompleteProfileType } from "@/schemas/auth.schema";
import { completeProfile, CompleteProfileState } from "@/app/actions/auth.actions";
import { startTransition } from "react";
import { toast } from "sonner";

export function CompleteProfile({ className, ...props }: React.ComponentProps<"div">) {
   const [formData, setFormData] = useState<CompleteProfileType>({
      username: "",
   });

   const [error, setError] = useState<{ username?: string[] }>({});

   const initialState = {};
   const [state, action, isPending] = useActionState<CompleteProfileState, CompleteProfileType>(completeProfile, initialState);

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
   }, [state]);

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Client-side validation
      const result = CompleteProfileSchema.safeParse(formData);
      if (!result.success) {
         return setError(flattenError(result.error).fieldErrors);
      }

      startTransition(() => {
         action(formData);
      });
   };

   return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
         <form onSubmit={handleSubmit}>
            <FieldGroup>
               <div className="flex flex-col items-center gap-2 text-center">
                  <a href="#" className="flex flex-col items-center gap-2 font-medium">
                     <div className="flex size-8 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-6" />
                     </div>
                     <span className="sr-only">True Feedback.</span>
                  </a>
                  <h1 className="text-xl font-bold">Welcome to True Feedback.</h1>
                  <FieldDescription>Choose a unique username to get started.</FieldDescription>
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
                     {isPending ? "Completing..." : "Complete Profile"}
                  </Button>
               </Field>
            </FieldGroup>
         </form>
      </div>
   );
}
