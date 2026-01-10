import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { CompleteProfile } from "@/components/CompleteProfile";

export default async function CompleteProfilePage() {
   const user = await getCurrentUser();
   if (user === "UNAUTHORIZED") {
      return redirect("/login");
   }

   if (user === "AUTHORIZED") {
      return redirect("/dashboard");
   }

   return (
      <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
         <div className="w-full max-w-sm">
            <CompleteProfile />
         </div>
      </div>
   );
}
