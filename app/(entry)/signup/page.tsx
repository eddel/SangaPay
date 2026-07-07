"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/sangapay/auth-card";
import { AuthHeader } from "@/components/sangapay/auth-header";
import { useSignUpFlow } from "@/features/auth/use-auth-flow";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p
      id={id}
      role="alert"
      aria-live="assertive"
      className="mt-2 text-sm font-medium text-rose-600"
    >
      {message}
    </p>
  );
}

export default function SignUpPage() {
  const router = useRouter();
  const { values, errors, updateValue, submit } = useSignUpFlow();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = submit();

    if (result.ok) {
      router.push(result.nextHref);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-6">
      <AuthHeader
        badge="Create your vault"
        title="Create your account."
        description="Enter your details, we'll send an OTP."
      />

      <AuthCard
        accent="from-emerald-500 via-teal-500 to-cyan-500"
        footer={
          <p className="text-center text-sm text-slate-500">
            Already a member?{" "}
            <Link href="/login" className="font-semibold text-slate-950">
              Log in
            </Link>
          </p>
        }
      >
        <form className="space-y-4" noValidate onSubmit={handleSubmit}>
          <label className="block" htmlFor="signup-full-name">
            <span className="text-sm font-semibold text-slate-900">
              Full name
            </span>
            <input
              id="signup-full-name"
              name="fullName"
              type="text"
              autoComplete="name"
              value={values.fullName}
              onChange={(event) => updateValue("fullName", event.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "signup-full-name-error" : undefined}
              className="mt-2 h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-emerald-400"
              placeholder="Jaja Mvondo"
            />
            <FieldError id="signup-full-name-error" message={errors.fullName} />
          </label>

          <label className="block" htmlFor="signup-phone">
            <span className="text-sm font-semibold text-slate-900">
              Phone number
            </span>
            <input
              id="signup-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(event) => updateValue("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "signup-phone-error" : undefined}
              className="mt-2 h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-emerald-400"
              placeholder="+233 670 000 000"
              inputMode="tel"
            />
            <FieldError id="signup-phone-error" message={errors.phone} />
          </label>

          <label className="block" htmlFor="signup-email">
            <span className="text-sm font-semibold text-slate-900">
              Email address
            </span>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => updateValue("email", event.target.value)}
              className="mt-2 h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-emerald-400"
              placeholder="jaja@sangapay.com"
              inputMode="email"
            />
          </label>

          <button
            type="submit"
            className="mt-2 flex h-14 w-full items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white"
          >
            Create account
          </button>
        </form>
      </AuthCard>
    </div>
  );
}
