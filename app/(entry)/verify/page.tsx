"use client";

import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/sangapay/auth-card";
import { AuthHeader } from "@/components/sangapay/auth-header";
import { OtpInput } from "@/components/sangapay/otp-input";
import { useVerifyFlow } from "@/features/auth/use-auth-flow";

export default function VerifyPage() {
  const router = useRouter();
  const { values, errors, updateValue, submit } = useVerifyFlow();

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
        badge="Confirm it's you"
        title="Enter your code."
        description="Enter the one-time code we just sent. We only need it once on this device."
        aside={
          <div className="flex size-14 items-center justify-center rounded-[20px] border border-slate-200 text-slate-950">
            <ShieldCheck className="size-6" />
          </div>
        }
      />

      <AuthCard accent="from-emerald-500 via-cyan-400 to-slate-950">
        <form className="space-y-6" noValidate onSubmit={handleSubmit}>
          <OtpInput
            value={values.code}
            onChange={(value) => updateValue("code", value)}
            error={errors.code}
          />

          <div className="rounded-[20px] border border-slate-100 px-4 py-4 text-sm leading-6 text-slate-500">
            Once verified, you can turn on Face ID for faster future access.
          </div>

          <button
            type="submit"
            className="flex h-14 w-full items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white"
          >
            Verify account
          </button>
        </form>
      </AuthCard>
    </div>
  );
}
