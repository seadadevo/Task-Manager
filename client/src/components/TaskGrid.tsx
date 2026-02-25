import { Loader2 } from "lucide-react";
import TaskCard from "@/components/TaskCard";
import PaginationControls from "./PaginationControls";

interface ITaskGridProps {
    tasks: any[];
    isLoading: boolean;
    isError: boolean;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const TaskGrid = ({ tasks, isLoading, isError, page, totalPages, onPageChange }: ITaskGridProps) => {
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
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((task) => (
                    <TaskCard key={task._id} task={task} />
                ))}
            </div>
            <PaginationControls
                page={page}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default TaskGrid;
