"use client";

import { store } from "@/lib/redux/store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

export default function ReduxProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
