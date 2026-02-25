import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import myApi from "@/api/apiClient";

const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            myApi.delete(`/tasks/delete/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({ queryKey: ["task-stats"] });
            toast.success("Task deleted successfully!");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to delete task");
        },
    });
};

export default useDeleteTask;
