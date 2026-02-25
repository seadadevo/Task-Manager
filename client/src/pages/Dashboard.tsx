import { useState } from "react";
import useTasksQuery, { type ITaskFilters } from "@/hooks/useTasksQuery";
import useStatsQuery from "@/hooks/useStatsQuery";
import { useAuthStore } from "@/store/authStore";
import DashboardStats from "@/components/DashboardStats";
import TaskFiltersMenu from "@/components/TaskFiltersMenu";
import TaskGrid from "@/components/TaskGrid";

const ITEMS_PER_PAGE = 6;

const Dashboard = () => {
    const { user } = useAuthStore();
    const [filters, setFilters] = useState<ITaskFilters>({});
    const [page, setPage] = useState(1);

    const { data, isLoading, isError } = useTasksQuery(filters);
    const { data: statsData } = useStatsQuery();

    const allTasks = data?.data?.tasks ?? [];
    const stats = statsData?.data?.stats ?? { total: 0, pending: 0, inProgress: 0, completed: 0 };

    const totalPages = Math.ceil(allTasks.length / ITEMS_PER_PAGE);
    const paginatedTasks = allTasks.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const handleSetFilters: typeof setFilters = (value) => {
        setPage(1);
        setFilters(value);
    };

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-8 space-y-8">
            <h1 className="text-2xl font-bold">Welcome, {user?.name?.split(" ")[0]}</h1>

            <DashboardStats stats={stats} />

            <TaskFiltersMenu filters={filters} setFilters={handleSetFilters} />

            <TaskGrid
                tasks={paginatedTasks}
                isLoading={isLoading}
                isError={isError}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default Dashboard;
