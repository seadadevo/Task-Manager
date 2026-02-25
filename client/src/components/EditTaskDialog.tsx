import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import useUpdateTask from "@/hooks/useUpdateTask";
import FormTextField from "@/components/FormTextField";

const editTaskSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters").max(100),
    description: z.string().min(10, "Description must be at least 10 characters").max(1000),
    status: z.enum(["Pending", "In-Progress", "Completed"]),
    priority: z.enum(["Low", "Medium", "High"]),
    dueDate: z.string().min(1, "Due date is required"),
});

type EditTaskFormData = z.infer<typeof editTaskSchema>;

interface IEditTaskDialogProps {
    task: {
        _id: string;
        title: string;
        description?: string;
        status: string;
        priority: string;
        dueDate?: string;
    };
    open: boolean;
    onClose: () => void;
}

const EditTaskDialog = ({ task, open, onClose }: IEditTaskDialogProps) => {
    const { mutate: updateTask, isPending } = useUpdateTask();

    const form = useForm<EditTaskFormData>({
        resolver: zodResolver(editTaskSchema),
        defaultValues: {
            title: task.title,
            description: task.description ?? "",
            status: task.status as EditTaskFormData["status"],
            priority: task.priority as EditTaskFormData["priority"],
            dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
        },
    });

    const onSubmit = (data: EditTaskFormData) => {
        updateTask(
            { id: task._id, formData: data },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Edit Task</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">

                        <FormTextField control={form.control} name="title" label="Title" placeholder="e.g. Fix login bug" />

                        <FormTextField control={form.control} name="description" label="Description" placeholder="Describe what needs to be done..." type="textarea" />

                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <select className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" {...field}>
                                                <option value="Pending">Pending</option>
                                                <option value="In-Progress">In-Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Priority</FormLabel>
                                        <FormControl>
                                            <select className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" {...field}>
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormTextField control={form.control} name="dueDate" label="Due Date" type="date" />

                        <div className="flex gap-2 justify-end pt-2">
                            <Button type="button" variant="outline" className="rounded-xl" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending} className="rounded-xl bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
                                {isPending ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditTaskDialog;
