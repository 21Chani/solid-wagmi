import { expect, test } from "vitest";

import { connect, disconnect } from "@wagmi/core";
import { accounts } from "../../test/constants.js";
import { renderHook } from "../../test/lib.js";
import { useAccount } from "./useAccount.js";
import { useConfig } from "./useConfig.js";

test("useAccount", async () => {
  const account = renderHook(useAccount);
  const config = renderHook(useConfig);

  expect(account().address).undefined;

  // Connect mocked account
  await connect(config, { connector: config.connectors[0]! });
  expect(account().address).toBe(accounts[0]);

  await disconnect(config, { connector: config.connectors[0]! });
});
