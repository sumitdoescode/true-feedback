"use client";
import { useTransition } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { deleteMessage } from "@/app/actions/message.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "./ui/spinner";

const DeleteMessage = ({ messageId }: { messageId: string }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDeleteMessage = () => {
        startTransition(() => {
            deleteMessage({ messageId });
            toast.success("Message deleted successfully");
            router.refresh();
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <div className="cursor-pointer p-2 rounded bg-primary/10 hover:bg-primary/20">
                    <Trash2 size={20} className="text-primary" />
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone. This will permanently delete your message</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteMessage} disabled={isPending}>
                        {isPending ? (
                            <>
                                Deleting... <Spinner />
                            </>
                        ) : (
                            "Delete"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteMessage;
