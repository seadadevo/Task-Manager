import { useQuery } from "@tanstack/react-query";
import myApi from "@/api/apiClient";

export interface ITask {
    _id: string;
    title: string;
    description?: string;
    status: "Pending" | "In-Progress" | "Completed";
    priority: "Low" | "Medium" | "High";
    dueDate?: string;
    createdAt: string;
    updatedAt: string;
}

const useTaskQuery = (id: string) => {
    return useQuery<ITask>({
        queryKey: ["task", id],
        queryFn: async () => {
            const res = await myApi.get(`/tasks/${id}`);
            return res.data.task;
        },
        enabled: !!id,
        retry: (failureCount, error: any) => {
            if (error?.response?.status === 404) return false;
            return failureCount < 2;
        },
    });
};

export default useTaskQuery;
