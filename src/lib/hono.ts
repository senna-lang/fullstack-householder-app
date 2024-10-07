import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";

export const cacheableClient = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!);

export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!, {
   fetch: (input: RequestInfo | URL, requestInit?: RequestInit) =>
     fetch(input, {
       cache: "no-cache",
       ...requestInit,
     }),
 });