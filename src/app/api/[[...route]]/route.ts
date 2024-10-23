import { Hono } from "hono"
import { handle } from "hono/vercel"

import user from "../user"
import expenseCategory from "../expenseCategory"
import userFinanceDataRoute from "../userFinanceDataRoute"

export const runtime = "edge"

const app = new Hono().basePath("/api")

const route = app
	.route("/user", user)
	.route("/expense-category", expenseCategory)
	.route("/user-finance-data", userFinanceDataRoute)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof route
