import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod'
import * as z from 'zod'

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const session_json_schema = z.toJSONSchema(createInsertSchema(session), {
	unrepresentable: "any", override:
		(ctx) => {
			const def = ctx.zodSchema._zod.def;
			if (def.type === "date") {
				ctx.jsonSchema.type = "string";
				ctx.jsonSchema.format = "date-time";
			}
		},
})
console.log(session_json_schema)
export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
