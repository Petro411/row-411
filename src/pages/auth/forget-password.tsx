import AuthLayout from "@/components/auth/AuthLayout";
import ChangePasswordForm from "@/components/settings/ChangePasswordForm";
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

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified,setOtpVerified] = useState(false);
  const { request, loading, data } = useMutation(
    otpSent ? endpoints.verifyOtp : endpoints.getOtp
  );
  // const router = useRouter();
  const handleOnSubmit = async (e: any) => {
    try {
      e.preventDefault();
      if (!otp && email) {
        await request({ email });
        toast(Label.OtpSentToEmail);
        setOtpSent(true);
      } else {
        await request({ email, otp }, endpoints.verifyOtp);
        setOtpSent(false);
        setOtp("");
        toast(Label.OtpVerified);
        setOtpVerified(true);
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
          {!otpSent && (
            <TextField.Root
              name="email"
              type="email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
          )}
          {otpSent && (
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
