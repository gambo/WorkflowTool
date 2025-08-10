import { relations } from 'drizzle-orm';
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

export const job = sqliteTable('job', {
	...default_columns(),
	quantity: integer('quantity').notNull(),
	description: text('description').notNull(),
	priority: text({ enum: ['high', 'medium', 'low'] }),
	status: text({ enum: ['active', 'inactive'] }),
});


export const item = sqliteTable('item', {
	...default_columns(),
	description: text('description').notNull(),
});

export const jobItems = sqliteTable('job_items', {
	...default_columns(),
	jobId: text('job_id').references(() => job.id, {
		onDelete: 'cascade',
	}),
	itemId: text('item_id').references(() => item.id, {
		onDelete: 'cascade',
	}),
})

export const session = sqliteTable('session', {
	...default_columns(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
});

export const jobRelations = relations(job, ({ many }) => ({
	jobItems: many(jobItems)
}))

export const jobItemsRelations = relations(jobItems, ({ one }) => ({
	job: one(job, {
		fields: [jobItems.jobId],
		references: [job.id],
	}),
	item: one(item, {
		fields: [jobItems.itemId],
		references: [item.id],
	}),
}));


export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
