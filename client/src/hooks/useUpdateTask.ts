import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import myApi from "@/api/apiClient";

export interface IUpdateTaskData {
    title?: string;
    description?: string;
    status?: "Pending" | "In-Progress" | "Completed";
    priority?: "Low" | "Medium" | "High";
    dueDate?: string;
}

const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, formData }: { id: string; formData: IUpdateTaskData }) =>
            myApi.put(`/tasks/${id}`, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({ queryKey: ["task-stats"] });
            toast.success("Task updated successfully!");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update task");
        },
    });
};

export default useUpdateTask;
