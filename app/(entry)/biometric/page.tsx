import { AuthHeader } from "@/components/sangapay/auth-header";
import { BiometricCard } from "@/components/sangapay/biometric-card";

export default function BiometricPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-6">
      <AuthHeader
        badge="Last setup step"
        title="Set up Face ID."
        description="Turn on Face ID for faster access when you come back to SangaPay."
      />

      <BiometricCard />
    </div>
  );
}
