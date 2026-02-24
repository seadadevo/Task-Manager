import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import myApi from "@/api/apiClient";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInputField from "@/components/FormInputField";
import { registerSchema, type RegisterFormValues } from "@/schemas/authSchema";

const Register = () => {
    const navigate = useNavigate();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { name: "", email: "", password: "", passwordConfirm: "" },
    });

    const { mutate: registerUser, isPending } = useMutation({
        mutationFn: async (data: RegisterFormValues) => {
            const res = await myApi.post("/auth/signup", data);
            return res.data;
        },  
        onSuccess: () => {
            toast.success("Account created");
            navigate("/");
        },
        onError: (error: any) => {
            toast.error(error.message || "Registration failed");
        },
    });

    const onSubmit = (data: RegisterFormValues) => registerUser(data);

    return (
        <div className="flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-md">

                <div className="flex flex-col items-center gap-3 mb-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-foreground">
                            Create your account
                        </h1>
                    </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                            <FormInputField
                                control={form.control}
                                name="name"
                                label="Full Name"
                                placeholder="Ahmed Magdy"
                                icon={User}
                            />

                            <FormInputField
                                control={form.control}
                                name="email"
                                label="Email"
                                placeholder="Ahmed@test.com"
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

                            <FormInputField
                                control={form.control}
                                name="passwordConfirm"
                                label="Confirm Password"
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
                                        Creating account...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>

                        </form>
                    </Form>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-foreground hover:underline underline-offset-4">
                        Sign in
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Register;