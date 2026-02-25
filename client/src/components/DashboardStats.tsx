import { CheckCircle2, Clock, Loader2, ListTodo } from "lucide-react";
import StatCard from "@/components/StatCard";
import type { ITaskStats } from "@/interfaces/task";

export type { ITaskStats };

interface IDashboardStatsProps {
  stats: ITaskStats;
}

const DashboardStats = ({ stats }: IDashboardStatsProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <StatCard
      label="Total"
      count={stats.total}
      icon={ListTodo}
      color="bg-gray-700"
    />
    <StatCard
      label="Pending"
      count={stats.pending}
      icon={Clock}
      color="bg-yellow-500"
    />
    <StatCard
      label="In Progress"
      count={stats.inProgress}
      icon={Loader2}
      color="bg-blue-500"
    />
    <StatCard
      label="Completed"
      count={stats.completed}
      icon={CheckCircle2}
      color="bg-green-500"
    />
  </div>
);

export default DashboardStats;
