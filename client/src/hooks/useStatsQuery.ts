import { useQuery } from "@tanstack/react-query";
import myApi from "@/api/apiClient";
import { type ITaskStats } from "@/components/DashboardStats";

const useStatsQuery = () => {
    return useQuery({
        queryKey: ["task-stats"],
        queryFn: (): Promise<{ data: { stats: ITaskStats } }> =>
            myApi.get("/tasks/stats"),
    });
};

export default useStatsQuery;
