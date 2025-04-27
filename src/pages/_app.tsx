import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css';
toastConfig({
  theme:"dark"
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <Component {...pageProps} />
    </Theme>
  );
}
