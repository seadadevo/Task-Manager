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

export interface ITaskFilters {
    keyword?: string;
    status?: "Pending" | "In-Progress" | "Completed";
    priority?: "Low" | "Medium" | "High";
    sort?: string;
}

export interface ICreateTaskData {
    title: string;
    description: string;
    status?: "Pending" | "In-Progress" | "Completed";
    priority?: "Low" | "Medium" | "High";
    dueDate: string;
}

export interface IUpdateTaskData {
    title?: string;
    description?: string;
    status?: "Pending" | "In-Progress" | "Completed";
    priority?: "Low" | "Medium" | "High";
    dueDate?: string;
}

export interface ITaskStats {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
}
