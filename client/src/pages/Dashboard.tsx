import { useState } from "react";
import useTasksQuery, { type ITaskFilters } from "@/hooks/useTasksQuery";
import useStatsQuery from "@/hooks/useStatsQuery";
import { useAuthStore } from "@/store/authStore";
import DashboardStats from "@/components/DashboardStats";
import TaskFiltersMenu from "@/components/TaskFiltersMenu";
import TaskGrid from "@/components/TaskGrid";

const Dashboard = () => {
    const { user } = useAuthStore();
    const [filters, setFilters] = useState<ITaskFilters>({});

    const { data, isLoading, isError } = useTasksQuery(filters);
    const { data: statsData } = useStatsQuery();

    const tasks = data?.data?.tasks ?? [];
    const stats = statsData?.data?.stats ?? { total: 0, pending: 0, inProgress: 0, completed: 0 };

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-8 space-y-8">
            <h1 className="text-2xl font-bold">Welcome, {user?.name?.split(" ")[0]}</h1>

            <DashboardStats stats={stats} />

            <TaskFiltersMenu filters={filters} setFilters={setFilters} />

            <TaskGrid tasks={tasks} isLoading={isLoading} isError={isError} />
        </div>
    );
};

export default Dashboard;
