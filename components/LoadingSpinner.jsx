import { Loader2 } from "lucide-react";
export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <Loader2 className="h-10 w-10 animate-spin text-white" />
        </div>
    );
}
