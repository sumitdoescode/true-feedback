import { headers } from "next/headers";
import { auth } from "@/auth";

export const getCurrentUser = async () => {
   const session = await auth.api.getSession({
      headers: await headers(),
   });

   if (!session?.user) {
      return "UNAUTHORIZED";
   }

   if (!session?.user?.isCompletedProfile) {
      return "INCOMPLETE";
   }

   return "AUTHORIZED";
};
