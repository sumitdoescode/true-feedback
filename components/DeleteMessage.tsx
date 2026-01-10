"use client";
import { useTransition } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteMessage } from "@/app/actions/message.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DeleteMessage = ({ messageId }: { messageId: string }) => {
   const [isPending, startTransition] = useTransition();
   const router = useRouter();

   const handleDeleteMessage = () => {
      startTransition(() => {
         deleteMessage(messageId);
         toast.success("Message deleted successfully");
         router.refresh();
      });
   };

   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button className="cursor-pointer" variant={"outline"} size={"icon"} disabled={isPending}>
               <Trash2 size={66} />
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
               <AlertDialogDescription>This action cannot be undone. This will permanently delete your message</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={handleDeleteMessage} disabled={isPending}>
                  Continue
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default DeleteMessage;
