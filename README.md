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
