import { z } from "zod";

const titleField = z
  .string()
  .min(5, "Title must be at least 5 characters")
  .max(100, "Title must be at most 100 characters");

const descriptionField = z
  .string()
  .min(10, "Description must be at least 10 characters")
  .max(1000, "Description must be at most 1000 characters");

const statusField = z.enum(["Pending", "In-Progress", "Completed"], {
  message: "Status must be: Pending, In-Progress, or Completed",
});

const priorityField = z.enum(["Low", "Medium", "High"], {
  message: "Priority must be: Low, Medium, or High",
});

const dueDateField = z.coerce
  .date()
  .refine((date) => date > new Date(), {
    message: "Due date must be in the future",
  });



export const createTaskSchema = z.object({
  body: z.object({
    title: titleField,
    description: descriptionField,
    status: statusField.optional(),
    priority: priorityField.optional(),
    dueDate: dueDateField,
  }),
});

export const updateTaskSchema = z.object({
  body: z
    .object({
      title: titleField.optional(),
      description: descriptionField.optional(),
      status: statusField.optional(),
      priority: priorityField.optional(),
      dueDate: dueDateField.optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided to update",
    }),
});
