import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Calendar,
    Clock,
    Flag,
    Loader2,
    Pencil,
    Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useTaskQuery from "@/hooks/useTaskQuery";
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

const fmt = (iso?: string) =>
    iso
        ? new Date(iso).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : null;

const TaskDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();
    const [showConfirm, setShowConfirm] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const { data: task, isLoading, isError } = useTaskQuery(id!);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (isError) {
    navigate("/");
    return null;
}

    if (!task) return null;

    return (
        <div className="max-w-[800px] mx-auto px-4 py-8 space-y-6">

            
            <button
                onClick={() => navigate("/")}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft size={15} />
                Back to Dashboard
            </button>

            <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-6">

                <div className="flex items-start justify-between gap-4">
                    <h1 className="text-xl font-bold text-foreground leading-snug">{task.title}</h1>
                    <div className="flex items-center gap-2 shrink-0">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setShowEdit(true)}
                            className="h-8 w-8 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-lg"
                            title="Edit task"
                        >
                            <Pencil size={15} />
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setShowConfirm(true)}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
                            title="Delete task"
                        >
                            <Trash2 size={15} />
                        </Button>
                    </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${STATUS_STYLES[task.status]}`}>
                        {task.status}
                    </span>
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${PRIORITY_STYLES[task.priority]}`}>
                        <Flag size={10} className="inline mr-1" />
                        {task.priority} Priority
                    </span>
                </div>

                {task.description && (
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Description</p>
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{task.description}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t">
                    {task.dueDate && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar size={15} className="shrink-0" />
                            <span>
                                <span className="font-medium text-foreground">Due: </span>
                                {fmt(task.dueDate)}
                            </span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock size={15} className="shrink-0" />
                        <span>
                            <span className="font-medium text-foreground">Created: </span>
                            {fmt(task.createdAt)}
                        </span>
                    </div>
                    {task.updatedAt !== task.createdAt && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock size={15} className="shrink-0" />
                            <span>
                                <span className="font-medium text-foreground">Updated: </span>
                                {fmt(task.updatedAt)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
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
                    isPending={isDeleting}
                    onConfirm={() => deleteTask(task._id, { onSuccess: () => navigate("/") })}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    );
};

export default TaskDetails;
