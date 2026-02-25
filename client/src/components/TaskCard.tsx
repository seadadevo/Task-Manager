import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Flag, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import useDeleteTask from "@/hooks/useDeleteTask";
import EditTaskDialog from "@/components/EditTaskDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";

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
    const [showEdit, setShowEdit] = useState(false);

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

                <div className="flex items-center gap-1 shrink-0">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setShowEdit(true)}
                        className="h-7 w-7 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-lg"
                        title="Edit task"
                    >
                        <Pencil size={13} />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setShowConfirm(true)}
                        className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
                        title="Delete task"
                    >
                        <Trash2 size={13} />
                    </Button>
                </div>
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

           
            {showEdit && (
                <EditTaskDialog
                    task={task}
                    open={showEdit}
                    onClose={() => setShowEdit(false)}
                />
            )}

            {showConfirm && (
                <DeleteConfirmDialog
                    title={task.title}
                    isPending={isPending}
                    onConfirm={() => { deleteTask(task._id); setShowConfirm(false); }}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    );
};

export default TaskCard;
