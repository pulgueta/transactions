import type { FC, PropsWithChildren } from "react";

import { ReduxProvider } from "./redux-provider";

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <ReduxProvider>{children}</ReduxProvider>
);
