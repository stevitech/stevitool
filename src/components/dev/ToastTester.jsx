import { toast } from "sonner";
import Button from "../ui/Button";

export default function ToastTester() {
    return (
        <div className="flex items-center gap-4">
            <Button
                onClick={() => toast.success("Copied link successfully!")}
                className=""
            >
                Test Success ✅
            </Button>
            <Button
                onClick={() => toast.error("Something went wrong.")}
                className=""
            >
                Test Error ⚠️
            </Button>
        </div>
    );
}
