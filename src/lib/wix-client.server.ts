import { Tokens } from "@wix/sdk";
import { cookies } from "next/headers";
import { cache } from "react";

import { getWixClient } from "./wix-client.base";
import { WIX_SESSION_COOKIE } from "./constant";

export const getWixSeverClient = cache(async () => {
  let tokens: Tokens | undefined;

  try {
    const cookieStore = await cookies();
    tokens = JSON.parse(cookieStore.get(WIX_SESSION_COOKIE)?.value || "{}");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {}

  return getWixClient(tokens);
});
