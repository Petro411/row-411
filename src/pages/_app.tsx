import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/style.css";
import "react-simple-toasts/dist/theme/dark.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthContextProvider from "@/context/AuthContext";
toastConfig({
  theme: "dark",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Theme>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
        >
          <Component {...pageProps} />
        </GoogleOAuthProvider>
      </Theme>
    </AuthContextProvider>
  );
}
