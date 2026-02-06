import SignOut from "@/components/SignOut";
import Container from "@/components/Container";
import ShareLink from "@/components/ShareLink";
import ToggleAcceptMessages from "@/components/ToggleAcceptMessages";
import UserMessages from "@/components/UserMessages";
import UpdateProfileBtn from "@/components/UpdateProfileBtn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cookies } from "next/headers";
import DeleteAccount from "@/components/DeleteAccount";

const Dashboard = async () => {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const res = await fetch(`${process.env.APPLICATION_BASE_URL}/api/user`, {
        headers: {
            cookie: cookieHeader,
        },
    });
    const { user } = await res.json();

    return (
        <Container>
            <div className="flex items-center gap-8">
                <Avatar className="w-28 h-28">
                    <AvatarImage src={user.image} alt={`@${user.username}`} />
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl font-semibold text-neutral-200">{user.name}</h1>
                    <p className="text-neutral-300 text-base">@{user.username}</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-6">
                <ShareLink username={user?.username} />
                <SignOut />
                <UpdateProfileBtn />
                <DeleteAccount />
            </div>

            <ToggleAcceptMessages isAcceptingMessages={user.isAcceptingMessages} />

            <UserMessages messages={user.messages} />
        </Container>
    );
};

export default Dashboard;
