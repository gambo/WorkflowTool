import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

const default_columns = () => {
	return {
		id: text('id').primaryKey(),
		created: integer('created', { mode: 'timestamp' }).notNull(),
		updated: integer('updated', { mode: 'timestamp' }).notNull(),
	}
}
export const user = sqliteTable('user', {
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	status: text({ enum: ['active', 'inactive'] }),
	...default_columns(),
});

export const session = sqliteTable('session', {
	...default_columns(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
