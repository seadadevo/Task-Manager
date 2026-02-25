import { z } from "zod";

export const createTaskSchema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters")
        .max(100, "Title must be at most 100 characters"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description must be at most 1000 characters"),
    status: z.enum(["Pending", "In-Progress", "Completed"]).optional(),
    priority: z.enum(["Low", "Medium", "High"]).optional(),
    dueDate: z
        .string()
        .min(1, "Due date is required")
        .refine((val) => new Date(val) > new Date(), {
            message: "Due date must be in the future",
        }),
});

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;
