import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import myApi from "@/api/apiClient";
import type { IUpdateTaskData } from "@/interfaces/task";

export type { IUpdateTaskData };

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
