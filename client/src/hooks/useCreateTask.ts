import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import myApi from "@/api/apiClient";

export interface ICreateTaskData {
    title: string;
    description: string;
    status?: "Pending" | "In-Progress" | "Completed";
    priority?: "Low" | "Medium" | "High";
    dueDate: string;
}

const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData: ICreateTaskData) =>
            myApi.post("/tasks/create", formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({ queryKey: ["task-stats"] });
            toast.success("Task created successfully!");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to create task");
        },
    });
};

export default useCreateTask;
