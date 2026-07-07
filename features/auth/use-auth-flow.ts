"use client";

import { useState } from "react";
import {
  validateLogin,
  validateOtp,
  validateSignUp,
  type LoginErrors,
  type LoginValues,
  type SignUpErrors,
  type SignUpValues,
  type VerifyErrors,
  type VerifyValues,
} from "@/features/auth/mock-auth";

const defaultSignUpValues: SignUpValues = {
  fullName: "",
  phone: "",
  email: "",
};

const defaultLoginValues: LoginValues = {
  phone: "",
};

const defaultVerifyValues: VerifyValues = {
  code: "",
};

function useFormFlow<TValues extends Record<string, string>, TErrors extends Partial<Record<keyof TValues, string>>>(
  defaultValues: TValues,
  initialValues: Partial<TValues>,
  validate: (values: TValues) => TErrors,
  nextHref: string,
) {
  const [values, setValues] = useState<TValues>({
    ...defaultValues,
    ...initialValues,
  });
  const [errors, setErrors] = useState<TErrors>({} as TErrors);
  const [submitted, setSubmitted] = useState(false);

  function updateValue<K extends keyof TValues>(field: K, value: TValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));

    if (submitted) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }
  }

  function submit() {
    const nextErrors = validate(values);

    setSubmitted(true);
    setErrors(nextErrors);

    return {
      ok: Object.keys(nextErrors).length === 0,
      nextHref,
    };
  }

  return {
    values,
    errors,
    submitted,
    updateValue,
    submit,
  };
}

export function useSignUpFlow(initialValues: Partial<SignUpValues> = {}) {
  return useFormFlow<SignUpValues, SignUpErrors>(
    defaultSignUpValues,
    initialValues,
    validateSignUp,
    "/verify",
  );
}

export function useLoginFlow(initialValues: Partial<LoginValues> = {}) {
  return useFormFlow<LoginValues, LoginErrors>(
    defaultLoginValues,
    initialValues,
    validateLogin,
    "/verify",
  );
}

export function useVerifyFlow(initialValues: Partial<VerifyValues> = {}) {
  return useFormFlow<VerifyValues, VerifyErrors>(
    defaultVerifyValues,
    initialValues,
    validateOtp,
    "/biometric",
  );
}
