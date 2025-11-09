import { expect, test, vi } from "vitest";
import { renderHook } from "../../test/lib.js";
import { useAccount } from "./useAccount.js";
import { useConfig } from "./useConfig.js";
import { useConnect } from "./useConnect.js";

test("useAccount", async () => {
  const account = renderHook(useAccount);
  const { config } = renderHook(useConfig);
  const connect = renderHook(useConnect);

  expect(account().address).not.toBeDefined();
  expect(account().status).toEqual("disconnected");

  connect.connect({ connector: config.connectors[0]! });

  await vi.waitFor(() => {
    expect(account().isConnected).to.be.true;
  });

  expect(account().address).toBeDefined();
  expect(account().status).toEqual("connected");
});
