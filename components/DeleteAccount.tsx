"use client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "./ui/spinner";

const DeleteAccount = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const deleteAccount = async () => {
        setIsDeleting(true);
        await authClient.deleteUser({});
        setIsDeleting(false);
        window.location.href = "/";
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className={"w-full sm:w-auto bg-destructive/20 text-destructive rounded-lg px-3 py-0.5"}>Delete Account</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone. This will permanently delete your account from our servers.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteAccount}>
                        {isDeleting ? (
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

export default DeleteAccount;
