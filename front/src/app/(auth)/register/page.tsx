"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { register as registerUser } from "@/app/actions/auth/actions";
import { Link, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const registerSchema = z.object({
  first_name: z.string().min(1, "auth.firstNameRequired"),
  last_name: z.string().min(1, "auth.lastNameRequired"),
  email: z.string().email("auth.emailInvalid"),
  password: z.string().min(6, "validation.minLength"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const t = useTranslations();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);

    const result = await registerUser(data.first_name, data.last_name, data.email, data.password);

    if (result.success) {
      toast({
        title: t("common.success", "Success"),
        description: t("auth.registerSuccess", "Account created successfully"),
      });
      router.push("/auth/login");
    } else {
      toast({
        variant: "destructive",
        title: t("common.error", "Error"),
        description: result.error || t("auth.registerFailed", "Registration failed"),
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {t("auth.registerTitle", "Create Account")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("auth.registerDescription", "Fill in your details to create a new account")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("auth.firstName", "First Name")}</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={loading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("auth.lastName", "Last Name")}</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={loading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.email", "Email")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="email@example.com"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.password", "Password")}</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="••••••••" disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t("common.loading", "Loading...") : t("auth.registerButton", "Register")}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            {t("auth.hasAccount", "Already have an account?")}{" "}
            <Link href="/auth/login" className="text-primary font-medium hover:underline">
              {t("auth.loginButton", "Login")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
