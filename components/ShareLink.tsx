"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

const ShareLink = ({ username }: { username: string }) => {
    const link = `${process.env.NEXT_PUBLIC_APPLICATION_BASE_URL}/u/${username}`;
    return (
        <Dialog>
            <DialogTrigger className={"bg-primary text-primary-foreground font-medium text-base px-3 py-1 rounded-md"}>Share your unique link</DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share your unique link</DialogTitle>
                    <DialogDescription>Anyone with this link can message you</DialogDescription>
                </DialogHeader>

                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input id="link" value={link} readOnly />
                    </div>
                    <Button
                        type="button"
                        size="sm"
                        className="px-3 cursor-pointer"
                        onClick={() => {
                            if (link) {
                                navigator.clipboard.writeText(link);
                                toast.success("Link copied to clipboard");
                            }
                        }}
                    >
                        <CopyIcon className="size-4" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ShareLink;
