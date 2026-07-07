import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import BiometricPage from "@/app/(entry)/biometric/page";
import LoginPage from "@/app/(entry)/login/page";
import SignUpPage from "@/app/(entry)/signup/page";
import VerifyPage from "@/app/(entry)/verify/page";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));

beforeEach(() => {
  push.mockClear();
});

describe("SignUpPage", () => {
  it("announces accessible field errors when required sign-up fields are empty", () => {
    render(<SignUpPage />);

    fireEvent.click(screen.getByRole("button", { name: "Create account" }));

    const fullNameError = screen.getByText("Full name is required");
    const phoneError = screen.getByText("Phone number is required");
    const alerts = screen.getAllByRole("alert");

    expect(fullNameError).toBeInTheDocument();
    expect(phoneError).toBeInTheDocument();
    expect(alerts).toHaveLength(2);
    expect(fullNameError).toHaveAttribute("aria-live", "assertive");
    expect(phoneError).toHaveAttribute("aria-live", "assertive");
    expect(screen.getByRole("textbox", { name: /Full name/i })).toHaveAttribute(
      "aria-describedby",
      "signup-full-name-error",
    );
    expect(screen.getByRole("textbox", { name: /Full name/i })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("textbox", { name: /Phone number/i })).toHaveAttribute(
      "aria-describedby",
      "signup-phone-error",
    );
    expect(screen.getByRole("textbox", { name: /Phone number/i })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });
});

describe("LoginPage", () => {
  it("announces an accessible required error when the phone number is empty", () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByRole("button", { name: "Continue to OTP" }));

    const phoneError = screen.getByText("Phone number is required");

    expect(phoneError).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Phone number is required");
    expect(phoneError).toHaveAttribute("aria-live", "assertive");
    expect(screen.getByRole("textbox", { name: /Phone number/i })).toHaveAttribute(
      "aria-describedby",
      "login-phone-error",
    );
    expect(screen.getByRole("textbox", { name: /Phone number/i })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("navigates to verify after a valid phone number is submitted", () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByRole("textbox", { name: /Phone number/i }), {
      target: { value: "+237 670 000 000" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Continue to OTP" }));

    expect(push).toHaveBeenCalledWith("/verify");
  });
});

describe("VerifyPage", () => {
  it("does not expose demo otp details or a hard-coded phone number in the verify ui", () => {
    render(<VerifyPage />);

    expect(screen.queryByText("Demo code")).not.toBeInTheDocument();
    expect(screen.queryByText("204811")).not.toBeInTheDocument();
    expect(screen.queryByText("+237 670 000 000")).not.toBeInTheDocument();
  });

  it("shows an inline error for an invalid otp code", () => {
    render(<VerifyPage />);

    fireEvent.change(screen.getByLabelText("Verification code"), {
      target: { value: "000000" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Verify account" }));

    expect(screen.getByText("That code is invalid or expired")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("That code is invalid or expired");
  });

  it("navigates to biometric after a valid otp code", () => {
    render(<VerifyPage />);

    fireEvent.change(screen.getByLabelText("Verification code"), {
      target: { value: "204811" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Verify account" }));

    expect(push).toHaveBeenCalledWith("/biometric");
  });
});

describe("BiometricPage", () => {
  it("shows the face id setup actions", () => {
    render(<BiometricPage />);

    expect(screen.getByRole("button", { name: "Enable Face ID" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Maybe later" })).toBeInTheDocument();
  });

  it("routes to the app when face id is enabled", () => {
    render(<BiometricPage />);

    fireEvent.click(screen.getByRole("button", { name: "Enable Face ID" }));

    expect(push).toHaveBeenCalledWith("/app");
  });

  it("routes to the app when biometric setup is skipped", () => {
    render(<BiometricPage />);

    fireEvent.click(screen.getByRole("button", { name: "Maybe later" }));

    expect(push).toHaveBeenCalledWith("/app");
  });
});
