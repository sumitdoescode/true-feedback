import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { IMessage } from "./UserMessages";
import DeleteMessage from "./DeleteMessage";
import dayjs from "dayjs";

const UserMessage = ({ _id, content, createdAt }: IMessage) => {
    const id = _id.toString();
    return (
        <Card>
            <CardHeader>
                <CardTitle className={"text-base font-medium"}>{content}</CardTitle>
                <p className="text-neutral-400 text-xs"> {dayjs(createdAt).format("DD MMM YY, hh:mm A")}</p>
            </CardHeader>
            <CardFooter>
                <DeleteMessage messageId={id} />
            </CardFooter>
        </Card>
    );
};

export default UserMessage;
