import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import myApi from "@/api/apiClient";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInputField from "@/components/FormInputField";
import { loginSchema, type LoginFormValues } from "@/schemas/authSchema";

const Login = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const { mutate: loginUser, isPending } = useMutation({
        mutationFn: (data: LoginFormValues) =>
            myApi.post("/auth/login", data),
        onSuccess: (res: any) => {
            setAuth(res.data, res.accessToken);
            toast.success("Welcome back!");
            navigate("/");
        },
        onError: (error: any) => {
            toast.error(error.message || "Invalid email or password");
        },
    });

    const onSubmit = (data: LoginFormValues) => loginUser(data);

    return (
        <div className="flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center gap-3 mb-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-foreground">
                            Welcome back
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Sign in to your account
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                            <FormInputField
                                control={form.control}
                                name="email"
                                label="Email"
                                placeholder="ahmed@test.com"
                                type="email"
                                icon={Mail}
                            />

                            <FormInputField
                                control={form.control}
                                name="password"
                                label="Password"
                                type="password"
                                icon={Lock}
                            />

                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full h-11 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold shadow-md transition-all active:scale-95 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 mt-2"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>

                        </form>
                    </Form>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-semibold text-foreground hover:underline underline-offset-4">
                        Create one
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Login;
