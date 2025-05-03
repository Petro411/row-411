import { getUser } from "@/context/AuthContext";
import GetApiErrorMessage from "@/utils/GetApiErrorMessage";
import { Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import React, { memo, useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import toast from "react-simple-toasts";

const ChangeEmailForm = () => {
  const user = getUser()?.user ?? null;
  const [email, setEmail] = useState(user?.email ?? "");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const handleChangeEmail = async (e: any) => {
    try {
      e.preventDefault();
      console.log(email);
      setOtpSent(true)
    } catch (error) {
      setOtpSent(false)
      toast(GetApiErrorMessage(error));
    }
  };


  useEffect(()=>{
    if(user?.email && !email){
        setEmail(user?.email)
    }
  },[user]);

  return (
    <form
      className="md:w-8/12 xl:w-5/12 flex flex-col gap-2"
      onSubmit={handleChangeEmail}
    >

        {
            otpSent && (
                <Flex mb={"4"} direction={"column"} gap={"2"}>
                <Heading size={"4"}>Verify OTP</Heading>
                <Text size={"2"}>An OTP has been sent to <b>{user?.email}</b>.<br/> Please verify the OTP.</Text>
                </Flex>
            ) 
                    }

      {!otpSent && (
        <TextField.Root
          placeholder="Email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          required={true}
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
          containerStyle={'!w-20 gap-3 mb-5'}
          inputStyle='border !h-12 !w-12 !rounded-lg !outline-primary'
        />
      )}
      <Button type="submit" size={"3"} className="!bg-btnPrimary">
        <Text size={"2"}>{otpSent ? "Verify" : "Update"}</Text>
      </Button>
      {otpSent && <button className="outline-none text-center text-primary underline">
        <Text size={"2"}>Resent</Text>
      </button>}
    </form>
  );
};

export default memo(ChangeEmailForm);
