type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function OtpInput({ value, onChange, error }: OtpInputProps) {
  return (
    <label className="block" htmlFor="verify-code">
      <span className="text-sm font-semibold text-slate-900">Verification code</span>
      <input
        id="verify-code"
        name="code"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        aria-label="Verification code"
        value={value}
        onChange={(event) => onChange(event.target.value.replace(/\D/g, "").slice(0, 6))}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "verify-code-error" : "verify-code-hint"}
        className="mt-3 h-16 w-full rounded-[24px] border border-slate-200 bg-white px-5 text-center text-2xl font-semibold tracking-[0.55em] text-slate-950 outline-none transition focus:border-emerald-400"
        placeholder="000000"
      />
      {error ? (
        <p
          id="verify-code-error"
          role="alert"
          aria-live="assertive"
          className="mt-3 text-sm font-medium text-rose-600"
        >
          {error}
        </p>
      ) : (
        <p id="verify-code-hint" className="mt-3 text-xs leading-5 text-slate-500">
          Enter the 6-digit code sent to your phone.
        </p>
      )}
    </label>
  );
}
