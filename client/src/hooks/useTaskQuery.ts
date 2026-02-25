import { useQuery } from "@tanstack/react-query";
import myApi from "@/api/apiClient";
import type { ITask } from "@/interfaces/task";

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
