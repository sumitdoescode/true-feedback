import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DeleteMessage from "./DeleteMessage";

interface IMessage {
   _id: string;
   content: string;
   createdAt: Date;
}

const UserMessages = ({ messages }: { messages: IMessage[] }) => {
   if (!messages.length) {
      return <h1 className="text-2xl text-neutral-200 font-semibold mt-10">No messages yet 😔</h1>;
   }
   return (
      <div className="mt-10">
         <div className="flex items-center gap-2">
            <Badge className="h-8 min-w-8 rounded-full px-1 font-mono tabular-nums text-xl" variant={"secondary"}>
               {messages.length}
            </Badge>
            <p className="text-lg text-neutral-200 font-semibold">Messages</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {messages.map((message: IMessage) => (
               <UserMessage key={message._id} {...message} />
            ))}
         </div>
      </div>
   );
};

export default UserMessages;

const UserMessage = ({ _id, content, createdAt }: IMessage) => {
   return (
      <Card>
         <CardHeader>
            <CardTitle className={"text-lg md:text-xl font-semibold"}>{content}</CardTitle>
            <p className="text-neutral-400 text-xs sm:text-sm">{createdAt.toLocaleString()}</p>
         </CardHeader>
         <CardFooter>
            <DeleteMessage messageId={_id} />
         </CardFooter>
      </Card>
   );
};
