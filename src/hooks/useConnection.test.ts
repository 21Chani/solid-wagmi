import { connect, disconnect } from "@wagmi/core";

import { expect, test } from "vitest";

import { config } from "../../test/config.js";
import { renderHook } from "../../test/lib.js";
import { useConnection } from "./useConnection.js";

test("default", async () => {
  const result = renderHook(() => useConnection());

  expect(result().address).not.toBeDefined();
  expect(result().status).toEqual("disconnected");

  await connect(config, { connector: config.connectors[0]! });

  expect(result().address).toBeDefined();
  expect(result().status).toEqual("connected");

  await disconnect(config);
});
