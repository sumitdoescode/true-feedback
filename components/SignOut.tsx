"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const SignOut = () => {
   const signout = async () => {
      await authClient.signOut({
         fetchOptions: {
            onSuccess: () => {
               redirect("/login"); // redirect to login page
            },
         },
      });
   };
   return (
      <Button onClick={signout} variant={"outline"}>
         Sign Out
      </Button>
   );
};

export default SignOut;
