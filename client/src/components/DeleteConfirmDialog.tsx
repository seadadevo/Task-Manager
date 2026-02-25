import { Button } from "@/components/ui/button";

interface IDeleteConfirmDialogProps {
    title: string;
    isPending?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmDialog = ({ title, isPending, onConfirm, onCancel }: IDeleteConfirmDialogProps) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-card border rounded-2xl p-6 shadow-xl w-full max-w-sm mx-4">
            <h3 className="font-semibold text-foreground text-lg">Delete task?</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-5">
                This will permanently delete{" "}
                <span className="font-medium text-foreground">"{title}"</span>.
            </p>
            <div className="flex gap-2 justify-end">
                <Button variant="outline" className="rounded-xl" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    variant="destructive"
                    className="rounded-xl"
                    disabled={isPending}
                    onClick={onConfirm}
                >
                    {isPending ? "Deleting..." : "Delete"}
                </Button>
            </div>
        </div>
    </div>
);

export default DeleteConfirmDialog;
