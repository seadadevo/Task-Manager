import { z } from "zod";

const nameField = z.string().min(5, "Name must be at least 5 characters");
const emailField = z.email("Invalid email format");
const passwordField = z.string().min(6, "Password must be at least 6 characters");
const passwordConfirmField = z.string().min(6, "Password must be at least 6 characters");


export const signupSchema = z.object({
  body: z.object({
    name: nameField,
    email: emailField,
    password: passwordField,
    passwordConfirm: passwordConfirmField
  }).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"], 
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: emailField,
    password: passwordField,
  }),
});