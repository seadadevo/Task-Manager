import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useCreateTask from "@/hooks/useCreateTask";
import { createTaskSchema, type CreateTaskFormData } from "@/schemas/createTaskSchema";
import FormTextField from "@/components/FormTextField";

const CreateTaskDialog = () => {
    const [open, setOpen] = useState(false);
    const { mutate: createTask, isPending } = useCreateTask();

    const form = useForm<CreateTaskFormData>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title: "",
            description: "",
            status: "Pending",
            priority: "Medium",
            dueDate: "",
        },
    });

    const onSubmit = (data: CreateTaskFormData) => {
        createTask(data, {
            onSuccess: () => {
                form.reset();
                setOpen(false);
            },
        });
    };

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-gray-900 text-white shadow-md hover:bg-gray-800 hover:shadow-lg transition-all active:scale-95 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
                <Plus size={18} />
                <span className="hidden sm:inline">New Task</span>
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">Create New Task</DialogTitle>
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
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="rounded-xl"
                                    onClick={() => { form.reset(); setOpen(false); }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="rounded-xl bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                                >
                                    {isPending ? "Creating..." : "Create Task"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateTaskDialog;
