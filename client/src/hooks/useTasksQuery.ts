import { useQuery } from "@tanstack/react-query";
import myApi from "@/api/apiClient";
import type { ITaskFilters } from "@/interfaces/task";
export type { ITaskFilters };

const useTasksQuery = (filters: ITaskFilters = {}) => {
    return useQuery({
        queryKey: ["tasks", filters],
        queryFn: () => myApi.get("/tasks", { params: filters }),
    });
};

export default useTasksQuery;
