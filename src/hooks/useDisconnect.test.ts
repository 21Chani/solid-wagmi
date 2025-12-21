import { connect } from "@wagmi/core";
import { beforeEach, expect, test, vi } from "vitest";
import { config } from "../../test/config.js";
import { renderHook } from "../../test/lib.js";
import { useAccount } from "./useAccount.js";
import { useConfig } from "./useConfig.js";
import { useDisconnect } from "./useDisconnect.js";

const connector = config.connectors[0]!;

beforeEach(async () => {
  await connect(config, { connector });
});

test("useDisconnect", async () => {
  const account = renderHook(useAccount);
  const config = renderHook(useConfig);
  const disconnect = renderHook(useDisconnect);

  expect(account().address).toBeDefined();
  expect(account().status).toEqual("connected");

  disconnect.disconnect({ connector: config.connectors[0]! });

  await vi.waitFor(() => {
    expect(account().isConnected).to.be.false;
  });

  expect(account().address).not.toBeDefined();
  expect(account().status).toEqual("disconnected");
});
