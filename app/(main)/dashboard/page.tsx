import { redirect } from "next/navigation";
import SignOut from "@/components/SignOut";
import Container from "@/components/Container";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { headers } from "next/headers";
import { auth } from "@/auth";
import ShareLink from "@/components/ShareLink";
import ToggleAcceptMessages from "@/components/ToggleAcceptMessages";
import UserMessages from "@/components/UserMessages";

const page = async () => {
   const session = await auth.api.getSession({
      headers: await headers(),
   });

   if (!session) {
      redirect("/login");
   }
   if (!session?.user?.isCompletedProfile) {
      redirect("/complete-profile");
   }
   let user;
   try {
      await connectDB();

      const result = await User.aggregate([
         {
            $match: {
               email: session?.user?.email,
            },
         },
         {
            $lookup: {
               from: "messages",
               localField: "_id",
               foreignField: "receiver",
               as: "messages",
            },
         },
         {
            $addFields: {
               messages: {
                  $sortArray: {
                     input: "$messages",
                     sortBy: {
                        createdAt: -1,
                     },
                  },
               },
            },
         },
      ]);

      user = result[0];
   } catch (error: any) {
      console.log(error);
   }

   return (
      <section className="py-10 flex-grow-1">
         <Container>
            <div className="flex items-center gap-8">
               <Avatar className="w-32 h-32">
                  <AvatarImage src={user.image} alt={`@${user.username}`} />
                  <AvatarFallback>{user.username[0]}</AvatarFallback>
               </Avatar>
               <div>
                  <h1 className="text-4xl font-semibold text-neutral-200">{user.name}</h1>
                  <p className="text-neutral-300 mt-1 text-lg">@{user.username}</p>
               </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
               <ShareLink username={user?.username} />
               <SignOut />
            </div>
            {/* accept messages */}
            <ToggleAcceptMessages isAcceptingMessages={user.isAcceptingMessages} />

            {/* messages */}
            <UserMessages messages={user.messages} />
         </Container>
      </section>
   );
};

export default page;
