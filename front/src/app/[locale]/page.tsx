"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Globe, FileText, Lock, Zap, Users, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  const t = useTranslations("home");
  const nav = useTranslations("nav");

  const features = [
    {
      icon: Shield,
      title: t("features.secure.title", "Secure & Anonymous"),
      description: t(
        "features.secure.description",
        "Your identity is protected. Submit reports securely without sharing personal information.",
      ),
    },
    {
      icon: Globe,
      title: t("features.multilang.title", "Multi-Language Support"),
      description: t(
        "features.multilang.description",
        "Available in 9 languages including Persian, Arabic, English, Chinese, and more.",
      ),
    },
    {
      icon: FileText,
      title: t("features.easy.title", "Easy to Use"),
      description: t(
        "features.easy.description",
        "Simple and intuitive interface. Submit reports with just a few clicks.",
      ),
    },
    {
      icon: Lock,
      title: t("features.private.title", "Privacy First"),
      description: t(
        "features.private.description",
        "Your data is encrypted and stored securely. We respect your privacy.",
      ),
    },
    {
      icon: Zap,
      title: t("features.fast.title", "Fast & Reliable"),
      description: t(
        "features.fast.description",
        "Built with modern technology for fast and reliable performance.",
      ),
    },
    {
      icon: Users,
      title: t("features.community.title", "Community Driven"),
      description: t(
        "features.community.description",
        "Help improve your community by reporting issues that matter.",
      ),
    },
  ];

  const steps = [
    {
      number: 1,
      title: t("steps.create.title", "Create Account"),
      description: t("steps.create.description", "Sign up for free in seconds"),
    },
    {
      number: 2,
      title: t("steps.submit.title", "Submit Report"),
      description: t("steps.submit.description", "Add details, photos, and location"),
    },
    {
      number: 3,
      title: t("steps.track.title", "Track Status"),
      description: t("steps.track.description", "Follow up on your reports"),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-20 md:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              {t("hero.badge", "Citizen Report Platform")}
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {t("hero.title", "Report Issues in Your Community")}
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              {t(
                "hero.description",
                "A secure and simple platform for citizens to report issues, track progress, and make a difference.",
              )}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="gap-2">
                <Link href="/auth/register">
                  {t("hero.ctaButton", "Get Started")} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auth/login">{nav("login", "Login")}</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-background [background:radial-gradient(125%_125%_at_50%_10%,not_#fff_40%,#6366f1_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,not_#030712_40%,#6366f1_100%)] opacity-20" />
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("features.title", "Why Choose Gozarish?")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t(
                "features.description",
                "Built for citizens, by citizens. Simple, secure, and effective.",
              )}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/50 py-20 md:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("howItWorks.title", "How It Works")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t(
                "howItWorks.description",
                "Three simple steps to make a difference in your community",
              )}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {step.number}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="absolute end-0 top-8 hidden h-px w-16 bg-border sm:block rtl:left-0 rtl:right-auto" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl rounded-xl border bg-card p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="mb-4 text-2xl font-bold">{t("trust.title", "Trusted by Citizens")}</h2>
              <p className="text-muted-foreground">
                {t("trust.description", "Join thousands of citizens making their voices heard")}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                t("trust.benefits.0", "Anonymous reporting"),
                t("trust.benefits.1", "Real-time tracking"),
                t("trust.benefits.2", "Secure data encryption"),
                t("trust.benefits.3", "Mobile friendly"),
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 md:py-32 text-primary-foreground">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("cta.title", "Ready to Make a Difference?")}
            </h2>
            <p className="mb-8 text-lg opacity-90">
              {t(
                "cta.description",
                "Join our community and start reporting issues that matter to you.",
              )}
            </p>
            <Button size="lg" variant="secondary" asChild className="gap-2">
              <Link href="/auth/register">
                {t("cta.button", "Create Your Account")} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
