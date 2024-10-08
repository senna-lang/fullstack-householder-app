import { hc } from "hono/client"

import type { AppType } from "@/app/api/[[...route]]/route"

export const cacheableClient = hc<AppType>(
	process.env.NEXT_PUBLIC_API_URL as string,
)

export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL as string, {
	fetch: (input: RequestInfo | URL, requestInit?: RequestInit) =>
		fetch(input, {
			cache: "no-cache",
			...requestInit,
		}),
})
