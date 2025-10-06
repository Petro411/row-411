import GetApiErrorMessage from "@/utils/GetApiErrorMessage";
import { useGoogleLogin } from "@react-oauth/google";
import baseApi, { endpoints } from "@/services/api";
import { setItem } from "@/utils/Localstorage";
import toast from "react-simple-toasts";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { label } from "@/branding";
import React from "react";

import ThirdPartyAuthButton from "../ThirdPartyAuthButton";


type Props = {
  title?: string;
};

const GoogleAuth = ({ title }: Props) => {
  const router = useRouter();
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await baseApi.post(`${endpoints.google}`, {
          token: response.access_token,
          token_type: response.token_type,
        });
        setItem("token", res.data.token);
        setCookie(null, "token", res.data.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
        toast(label.LoginSuccessfull);
        setTimeout(() => {
          router.push("/profile");
        }, 500);
      } catch (error) {
        console.log(error);
        toast(GetApiErrorMessage(error));
      }
    },
    onNonOAuthError: (error) => {
      console.log(error);
      toast(GetApiErrorMessage(error));
    },
    onError: (error) => {
      console.log(error);
      toast(GetApiErrorMessage(error));
    },
  });
  return (
    <ThirdPartyAuthButton
      onClick={handleGoogleLogin}
      title={title}
      image="/assets/images/google.png"
    />
  );
};

export default GoogleAuth;
