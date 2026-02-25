import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Flag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useDeleteTask from "@/hooks/useDeleteTask";

const STATUS_STYLES: Record<string, string> = {
    "Pending":     "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    "In-Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    "Completed":   "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
};

const PRIORITY_STYLES: Record<string, string> = {
    "Low":    "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    "Medium": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    "High":   "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

interface ITaskCardProps {
    task: {
        _id: string;
        title: string;
        description?: string;
        status: string;
        priority: string;
        dueDate?: string;
    };
}

const TaskCard = ({ task }: ITaskCardProps) => {
    const { mutate: deleteTask, isPending } = useDeleteTask();
    const [showConfirm, setShowConfirm] = useState(false);

    const formattedDate = task.dueDate
        ? new Date(task.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
          })
        : null;

    return (
        <div className="rounded-2xl border bg-card p-5 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">

            <div className="flex items-start justify-between gap-2">
                <Link
                    to={`/tasks/${task._id}`}
                    className="font-semibold text-foreground hover:underline underline-offset-4 line-clamp-2 leading-snug"
                >
                    {task.title}
                </Link>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setShowConfirm(true)}
                    className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
                >
                    <Trash2 size={14} />
                </Button>
            </div>

            {task.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
            )}

            <div className="flex gap-2 flex-wrap">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[task.status]}`}>
                    {task.status}
                </span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${PRIORITY_STYLES[task.priority]}`}>
                    <Flag size={10} className="inline mr-1" />
                    {task.priority}
                </span>
            </div>

            {formattedDate && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-auto">
                    <Calendar size={12} />
                    <span>{formattedDate}</span>
                </div>
            )}

            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-card border rounded-2xl p-6 shadow-xl w-full max-w-sm mx-4">
                        <h3 className="font-semibold text-foreground text-lg">Delete task?</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-5">
                            This will permanently delete <span className="font-medium text-foreground">"{task.title}"</span>.
                        </p>
                        <div className="flex gap-2 justify-end">
                            <Button
                                variant="outline"
                                className="rounded-xl"
                                onClick={() => setShowConfirm(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                className="rounded-xl"
                                disabled={isPending}
                                onClick={() => {
                                    deleteTask(task._id);
                                    setShowConfirm(false);
                                }}
                            >
                                {isPending ? "Deleting..." : "Delete"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskCard;
