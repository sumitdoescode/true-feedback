import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const getAuthUser = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user || !session?.user.isCompletedProfile) {
        return null;
    }
    return session.user;
};
