"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/sangapay/auth-card";
import { AuthHeader } from "@/components/sangapay/auth-header";
import { useLoginFlow } from "@/features/auth/use-auth-flow";

export default function LoginPage() {
  const router = useRouter();
  const { values, errors, updateValue, submit } = useLoginFlow();

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
        badge="Welcome back"
        title="Log in with your phone."
        description="Use the number linked to your SangaPay vault. We'll send a one-time code next."
      />

      <AuthCard
        accent="from-slate-950 via-emerald-500 to-emerald-300"
        footer={
          <div className="flex items-center justify-between gap-3 text-sm">
            <p className="text-slate-500">New to SangaPay?</p>
            <Link href="/signup" className="font-semibold text-slate-950">
              Create an account
            </Link>
          </div>
        }
      >
        <form className="space-y-4" noValidate onSubmit={handleSubmit}>
          <label className="block" htmlFor="login-phone">
            <span className="text-sm font-semibold text-slate-900">Phone number</span>
            <input
              id="login-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(event) => updateValue("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "login-phone-error" : undefined}
              className="mt-2 h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-emerald-400"
              inputMode="tel"
            />
            {errors.phone ? (
              <p
                id="login-phone-error"
                role="alert"
                aria-live="assertive"
                className="mt-2 text-sm font-medium text-rose-600"
              >
                {errors.phone}
              </p>
            ) : (
              <p className="mt-2 text-xs leading-5 text-slate-500">
                We&apos;ll send a one-time passcode next. No password needed.
              </p>
            )}
          </label>

          <button
            type="submit"
            className="mt-2 flex h-14 w-full items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white"
          >
            Continue to OTP
          </button>
        </form>
      </AuthCard>
    </div>
  );
}
