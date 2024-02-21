import { ReactNode } from "react";
import "./../styles/global.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): ReactNode {
    return <Component {...pageProps} />;
}

export default MyApp;
