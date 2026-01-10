import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Container from "@/components/Container";
import SendMessage from "@/components/SendMessage";
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react";
import { OctagonX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Promise<{ username: string }> }) => {
   const { username } = await params;
   const res = await fetch(`http://localhost:3000/api/user/${username}`);
   const data = await res.json();

   //    if user with that username doesn't exists
   if (!data.success) {
      return notFound();
   }

   const user = data.data.user;
   return (
      <section className="flex-grow-1 py-10">
         <Container>
            <div className="flex items-center gap-6">
               <Avatar className="w-24 h-24">
                  <AvatarImage src={user.image} alt={`@${user.username}`} />
                  <AvatarFallback>{user.username[0]}</AvatarFallback>
               </Avatar>
               <div>
                  <h1 className="text-3xl font-semibold text-neutral-200">{user.name}</h1>
                  <p className="text-neutral-300 text-base">@{user.username}</p>
               </div>
            </div>

            {/* send message form */}
            {user.isAcceptingMessages ? (
               <SendMessage username={user.username} />
            ) : (
               <Item variant="outline" size="sm" className="mt-10">
                  <ItemMedia>
                     <OctagonX className="size-6" />
                  </ItemMedia>
                  <ItemContent className="flex-grow">
                     <ItemTitle className="text-neutral-200 text-base">{user.name} is currently not accepting messages</ItemTitle>
                  </ItemContent>
               </Item>
            )}
         </Container>
      </section>
   );
};

export default page;
