"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useActionState, useState, startTransition, useEffect } from "react";
import { MessageSchema, MessageType } from "@/schemas/message.schema";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { CircleAlert } from "lucide-react";
import { sendMessage, SendMessageState } from "@/app/actions/message.action";
import { toast } from "sonner";
import { BadgeCheckIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";

const SendMessage = ({ username }: { username: string }) => {
    const [formData, setFormData] = useState<MessageType>({ content: "", to: username });
    const [errors, setErrors] = useState<{ content?: string[] }>({});
    const [success, setSuccess] = useState<boolean>(false);
    const [generating, setGenerating] = useState<boolean>(false);

    const initialState: SendMessageState = {
        success: false,
        message: "",
        error: {},
    };

    const [state, action, isPending] = useActionState<SendMessageState, MessageType>(sendMessage, initialState);

    const generateMessage = async () => {
        try {
            setGenerating(true);
            const { data } = await axios.get(`/api/message`);
            if (!data.success) {
                toast.error("Something went wrong");
                return;
            }
            setFormData({ ...formData, content: data.data });
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setGenerating(false);
        }
    };

    useEffect(() => {
        if (!state) return;
        if (!state.success) {
            if (state.error) {
                setErrors(state.error);
                return;
            }
            if (state.message) {
                toast.error(state.message);
                return;
            }
        }
        toast.success(state.message);
        setSuccess(true);
        setFormData({ content: "", to: username });
    }, [state]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // client side validation
        const result = MessageSchema.safeParse(formData);

        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors);
            return;
        }

        startTransition(() => {
            action(result.data);
        });
    };
    return (
        <div className="mt-8">
            <form onSubmit={handleSubmit}>
                <Textarea
                    placeholder="Type your message here."
                    name="content"
                    className="h-30"
                    value={formData.content}
                    onChange={(e) => {
                        setSuccess(false);
                        setErrors({});
                        setFormData({ ...formData, content: e.target.value });
                    }}
                />
                {errors?.content &&
                    errors?.content?.map((error, index) => {
                        return (
                            <div className="text-red-500 flex items-center gap-2 mt-3" key={index}>
                                <CircleAlert className="size-4" />
                                <p className="text-sm">{error}</p>
                            </div>
                        );
                    })}
                <div className="flex items-center mt-4 gap-2 ">
                    <Button type="submit" className="grow cursor-pointer" size={"lg"} variant={"default"} disabled={isPending || generating}>
                        {isPending ? (
                            <>
                                Sending...
                                <Spinner />
                            </>
                        ) : (
                            "Send"
                        )}
                    </Button>
                    <Button className="grow cursor-pointer" size={"lg"} variant={"secondary"} onClick={generateMessage} disabled={generating || isPending}>
                        {generating ? (
                            <>
                                Generating...
                                <Spinner />
                            </>
                        ) : (
                            "Generate Message with AI"
                        )}
                    </Button>
                </div>
            </form>
            {success && (
                <Item variant="outline" size="sm" className="mt-6">
                    <ItemMedia>
                        <BadgeCheckIcon className="size-5 text-green-300" />
                    </ItemMedia>
                    <ItemContent className="grow">
                        <ItemTitle className="text-green-300">{state.message}</ItemTitle>
                    </ItemContent>
                </Item>
            )}
        </div>
    );
};

export default SendMessage;
