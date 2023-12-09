import "../styles/globals.css";
import "@mantine/core/styles.css";
import store from "../app/store";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider>
      <Provider store={store}>
        <Component {...pageProps} />
        <SpeedInsights />
        <Analytics />
      </Provider>
    </MantineProvider>
  );
}
