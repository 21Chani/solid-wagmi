import { splitProps } from "solid-js";
import { parseEther } from "viem";
import { beforeEach, expect, test, vi } from "vitest";
import { chain } from "../../test/chains.js";
import { testClient } from "../../test/clients.js";
import { accounts } from "../../test/constants.js";
import { renderHook } from "../../test/lib.js";
import { useBalance } from "./useBalance.js";

const address = accounts[0];

beforeEach(async () => {
  await testClient.mainnet.setBalance({ address, value: parseEther("10000") });
  await testClient.mainnet.mine({ blocks: 1 });
  await testClient.mainnet2.setBalance({ address, value: parseEther("69") });
  await testClient.mainnet2.mine({ blocks: 1 });
});

test("default", async () => {
  const result = renderHook(() => useBalance(() => ({ address })));

  await vi.waitUntil(() => result.isSuccess, { timeout: 5_000 });

  const [data] = splitProps(result, ["data"]);

  expect(data.data).toMatchObject(
    expect.objectContaining({
      decimals: expect.any(Number),
      symbol: expect.any(String),
      value: expect.any(BigInt),
    })
  );

  expect(data.data).toMatchInlineSnapshot(`
    {
      "decimals": 18,
      "formatted": "10000",
      "symbol": "ETH",
      "value": 10000000000000000000000n,
    }
  `);
});

test("parameters: chainId", async () => {
  const result = renderHook(() =>
    useBalance(() => ({ address, chainId: chain.mainnet2.id }))
  );

  await vi.waitUntil(() => result.isSuccess, { timeout: 5_000 });

  const [data] = splitProps(result, ["data"]);

  expect(data.data).toMatchObject(
    expect.objectContaining({
      decimals: expect.any(Number),
      symbol: expect.any(String),
      value: expect.any(BigInt),
    })
  );

  expect(data.data).toMatchInlineSnapshot(`
    {
      "decimals": 18,
      "formatted": "69",
      "symbol": "WAG",
      "value": 69000000000000000000n,
    }
  `);
});
