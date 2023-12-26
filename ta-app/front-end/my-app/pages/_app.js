import "../styles/globals.css";
import "@mantine/core/styles.css";
import Head from "next/head";
import store from "../app/store";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import dynamic from "next/dynamic";

const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  {
    ssr: false,
  }
);

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider
      theme={{
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Provider store={store}>
        <Head>
          <link rel="preconnect" href="https://rsms.me/" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <Component {...pageProps} />
        <SpeedInsights />
        <Analytics />
        <Toaster position="bottom-right" reverseOrder={false} />
      </Provider>
    </MantineProvider>
  );
}
