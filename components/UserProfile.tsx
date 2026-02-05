import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Container from "@/components/Container";
import SendMessage from "@/components/SendMessage";
import { OctagonX } from "lucide-react";
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { notFound } from "next/navigation";

const UserProfile = async ({ params }: { params: Promise<{ username: string }> }) => {
    const { username } = await params;
    const res = await fetch(`${process.env.APPLICATION_BASE_URL}/api/user/${username}`);
    const data = await res.json();

    // if user with that username doesn't exists
    if (!data.success) {
        return notFound();
    }

    const { user } = data;
    return (
        <Container>
            <div className="flex items-center gap-6">
                <Avatar className="w-28 h-28">
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
                    <ItemContent className="grow">
                        <ItemTitle className="text-neutral-200 text-base">{user.name} is currently not accepting messages</ItemTitle>
                    </ItemContent>
                </Item>
            )}
        </Container>
    );
};

export default UserProfile;
