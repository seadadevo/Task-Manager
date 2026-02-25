import { Loader2 } from "lucide-react";
import TaskCard from "@/components/TaskCard";

interface ITaskGridProps {
    tasks: any[];
    isLoading: boolean;
    isError: boolean;
}

const TaskGrid = ({ tasks, isLoading, isError }: ITaskGridProps) => {
    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (isError) {
        return (
            <p className="text-center text-destructive py-10">
                Failed to load tasks. Please try again.
            </p>
        );
    }

    if (tasks.length === 0) {
        return (
            <p className="text-center text-muted-foreground py-10">
                No tasks found. Create one to get started!
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
                <TaskCard key={task._id} task={task} />
            ))}
        </div>
    );
};

export default TaskGrid;
