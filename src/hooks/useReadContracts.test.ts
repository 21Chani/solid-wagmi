import { expect, test, vi } from "vitest";
import { abi, address } from "../../test/constants.js";
import { renderHook } from "../../test/lib.js";
import { useReadContracts } from "./useReadContracts.js";

test("default", async () => {
  const result = renderHook(() =>
    useReadContracts(() => ({
      contracts: [
        {
          address: address.wagmiMintExample,
          abi: abi.wagmiMintExample,
          functionName: "balanceOf",
          args: ["0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC" as const],
        },
        {
          address: address.wagmiMintExample,
          abi: abi.wagmiMintExample,
          functionName: "totalSupply",
          args: [],
        },
      ],
    }))
  );

  await vi.waitUntil(() => result.isSuccess, { timeout: 10_000 });

  console.log(result.data);

  expect(result.data?.[0].result).toMatchInlineSnapshot(`10n`);
});
