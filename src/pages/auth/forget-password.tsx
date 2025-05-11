import AuthLayout from "@/components/auth/AuthLayout";
import Label from "@/config/Label";
import { useMutation } from "@/hooks/useMutation";
import { endpoints } from "@/services/api";
import GetApiErrorMessage from "@/utils/GetApiErrorMessage";
import { Button, Text, TextField } from "@radix-ui/themes";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import toast from "react-simple-toasts";

type Steps = "email" | "otp" | "reset";

const ForgetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<Steps>("email");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const { request, loading, data } = useMutation(
    otpSent ? endpoints.verifyOtp : endpoints.getOtp
  );
  // const router = useRouter();
  const handleOnSubmit = async (e: any) => {
    try {
      e.preventDefault();
      if (step === "email" && email) {
        await request({ email });
        toast(Label.OtpSentToEmail);
        setStep("otp");
      }

      if (step === "otp" && otp) {
        await request({ email, otp }, endpoints.verifyOtp);
        setStep("reset");
        toast(Label.OtpVerified);
      }

      if (step === "reset" && password) {
        await request({ email, password }, endpoints.setNewPassword);
        setStep("email");
        setPassword("");
        setOtp("");
        setEmail("");
        toast(Label.PasswordUpdated);
        router.push("/auth/login")
      }
    } catch (error) {
      toast(GetApiErrorMessage(error));
    }
  };
  return (
    <>
      <Head>
        <title>{otpSent ? "Verify OTP" : "Forget password"}</title>
      </Head>
      <AuthLayout title={otpSent ? "Verify OTP" : Label.ForgetPassword}>
        <Text size={"2"} color="gray">
          {otpSent
            ? `Enter the 6-digit code sent to your email to continue.`
            : `Enter your email to get an OTP verify the OTP and regain access.`}
        </Text>
        <form onSubmit={handleOnSubmit} className="mt-5">
          {step === "email" && (
            <TextField.Root
              name="email"
              type="email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
          )}
          {step === "otp" && (
            <OTPInput
              value={otp}
              onChange={(e) => setOtp(e)}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              numInputs={4}
              shouldAutoFocus={true}
              containerStyle={"!w-20 gap-3 mb-5"}
              inputStyle="border !h-12 !w-12 !rounded-lg !outline-primary"
            />
          )}

          {step === "reset" && (
            <TextField.Root
              name="password"
              type="text"
              required={true}
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
            />
          )}

          <Button
            disabled={loading}
            loading={loading}
            type="submit"
            size={"3"}
            className="!bg-btnPrimary !mt-4"
          >
            <Text size={"2"}>{otpSent ? "Verify" : "Submit"}</Text>
          </Button>
        </form>
      </AuthLayout>
    </>
  );
};

export default ForgetPassword;
