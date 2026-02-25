import { useQuery } from "@tanstack/react-query";
import myApi from "@/api/apiClient";

export interface ITaskFilters {
    keyword?: string;
    status?: "Pending" | "In-Progress" | "Completed";
    priority?: "Low" | "Medium" | "High";
    sort?: string;
    // page?: number;
    // limit?: number;
}

const useTasksQuery = (filters: ITaskFilters = {}) => {
    return useQuery({
        queryKey: ["tasks", filters],
        queryFn: () => myApi.get("/tasks", { params: filters }),
    });
};

export default useTasksQuery;
