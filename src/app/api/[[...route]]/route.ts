import { Hono } from "hono"
import { handle } from "hono/vercel"
import { expenseCategory, user, userFinanceData } from "../route"

export const runtime = "edge"

const app = new Hono().basePath("/api")

const route = app
	.route("/user", user.default)
	.route("/expense-category", expenseCategory.default)
	.route("/user-finance-data", userFinanceData.default)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof route
