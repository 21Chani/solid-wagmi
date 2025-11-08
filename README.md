Solid wagmi is a library that uses [Wagmi](https://wagmi.sh) core to provide high end solid.js hooks.

# Getting Started

Install the required packages

```bash
pnpm add solid-wagmi viem@2.x @tanstack/solid-query
```

# Create Config

```ts
import { createConfig, http } from "solid-wagmi";
import { mainnet, sepolia } from "solid-wagmi/chains";

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
```

# App root

```ts
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import config from "./config";
const queryClient = new QueryClient();

function AppRoot() {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        {props.children}
      </WagmiProvider>
    </QueryClientProvider>
  );
}
```

This library does use wagmi's philosophy, to fully understand how you can implement it within your solid.js app, read the [wagmi docs](https://wagmi.sh/react/getting-started) first
