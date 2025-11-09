import { render } from "@solidjs/testing-library";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { createEffect } from "solid-js";
import h from "solid-js/h";

import { WagmiProvider } from "../src/context.js";
import { config } from "./config.js";

const qc = new QueryClient();

export function renderHook<HookFN extends () => unknown>(hookFn: HookFN) {
  let result!: ReturnType<HookFN>;

  function TestComponent() {
    const value = hookFn() as ReturnType<HookFN>;
    createEffect(() => (result = value));
    return null;
  }

  render(() =>
    h(
      WagmiProvider,
      { config },
      h(QueryClientProvider, { client: qc }, h(TestComponent))
    )()
  );

  return result;
}
