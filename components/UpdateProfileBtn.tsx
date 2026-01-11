"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const UpdateProfileBtn = () => {
    const router = useRouter();
    return (
        <Button onClick={() => router.push("/update-profile")} variant={"secondary"}>
            Update Profile
        </Button>
    );
};

export default UpdateProfileBtn;
