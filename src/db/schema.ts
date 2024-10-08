import {
	date,
	decimal,
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core"

// ユーザーテーブル
export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	username: varchar("username", { length: 50 }).notNull(),
	email: varchar("email", { length: 100 }).notNull().unique(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
})

// 支出カテゴリーテーブル
export const expenseCategories = pgTable("expense_categories", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 50 }).notNull(),
})

// ユーザー財務テーブル
export const userFinances = pgTable("user_finances", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id),
	categoryId: integer("category_id")
		.notNull()
		.references(() => expenseCategories.id),
	amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
	date: date("date").notNull(),
})
