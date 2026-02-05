import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserButton = ({ user }: { user: any }) => {
    return (
        <Avatar className="w-9 h-9">
            <AvatarImage src={user.image} alt={`@${user.name}`} />
            <AvatarFallback>{user.email.split("@")[0].slice(0, 2)}</AvatarFallback>
        </Avatar>
    );
};

export default UserButton;
