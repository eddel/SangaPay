export const demoAuthUser = {
  fullName: "Nadine Mvondo",
  phone: "+237 670 000 000",
  email: "nadine@sangapay.demo",
  otpCode: "204811",
};

export type SignUpValues = {
  fullName: string;
  phone: string;
  email: string;
};

export type LoginValues = {
  phone: string;
};

export type VerifyValues = {
  code: string;
};

export type SignUpErrors = Partial<Record<keyof SignUpValues, string>>;
export type LoginErrors = Partial<Record<keyof LoginValues, string>>;
export type VerifyErrors = Partial<Record<keyof VerifyValues, string>>;

export function validateSignUp(values: SignUpValues) {
  const errors: SignUpErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required";
  }

  return errors;
}

export function validateLogin(values: LoginValues) {
  const errors: LoginErrors = {};

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required";
  }

  return errors;
}

export function isValidOtp(code: string) {
  return code.trim() === demoAuthUser.otpCode;
}

export function validateOtp(values: VerifyValues) {
  const errors: VerifyErrors = {};

  if (!values.code.trim()) {
    errors.code = "Enter the 6-digit code";
  } else if (!isValidOtp(values.code)) {
    errors.code = "That code is invalid or expired";
  }

  return errors;
}
