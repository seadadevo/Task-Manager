import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type ITaskFilters } from "@/hooks/useTasksQuery";

const STATUS_OPTIONS   = ["All", "Pending", "In-Progress", "Completed"] as const;
const PRIORITY_OPTIONS = ["All", "Low", "Medium", "High"] as const;

const SORT_OPTIONS = [
    { label: "Newest", value: "-createdAt" },
    { label: "Oldest", value: "createdAt" },
    { label: "Due Date", value: "dueDate" },
    { label: "High Priority", value: "-priority" },
];

interface ITaskFiltersMenuProps {
    filters: ITaskFilters;
    setFilters: React.Dispatch<React.SetStateAction<ITaskFilters>>;
}

const TaskFiltersMenu = ({ filters, setFilters }: ITaskFiltersMenuProps) => {
    const [keyword, setKeyword] = useState("");

    const handleSearch = () => {
        setFilters((prev) => ({ ...prev, keyword }));
    };

    const handleStatus = (status: string) => {
        setFilters((prev) => ({
            ...prev,
            status: status === "All" ? undefined : (status as ITaskFilters["status"]),
        }));
    };

    const handlePriority = (priority: string) => {
        setFilters((prev) => ({
            ...prev,
            priority: priority === "All" ? undefined : (priority as ITaskFilters["priority"]),
        }));
    };

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters((prev) => ({ ...prev, sort: e.target.value }));
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-2">
                <Input
                    placeholder="Search tasks..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="rounded-xl flex-1"
                />
                <Button
                    onClick={handleSearch}
                    className="rounded-xl bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                >
                    Search
                </Button>

                <select
                    value={filters.sort ?? "-createdAt"}
                    onChange={handleSort}
                    className="rounded-xl border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-wrap gap-3">
                <div className="flex gap-1 flex-wrap">
                    {STATUS_OPTIONS.map((s) => (
                        <Button
                            key={s}
                            size="sm"
                            variant={
                                filters.status === s || (s === "All" && !filters.status)
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() => handleStatus(s)}
                            className="rounded-xl text-xs"
                        >
                            {s}
                        </Button>
                    ))}
                </div>

                <div className="flex gap-1 flex-wrap">
                    {PRIORITY_OPTIONS.map((p) => (
                        <Button
                            key={p}
                            size="sm"
                            variant={
                                filters.priority === p || (p === "All" && !filters.priority)
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() => handlePriority(p)}
                            className="rounded-xl text-xs"
                        >
                            {p}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskFiltersMenu;
