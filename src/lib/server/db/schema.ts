import { job } from '$routes/job/schema.server';
import { relations } from 'drizzle-orm';
import { sqliteTable, integer, text, int, } from 'drizzle-orm/sqlite-core';
export { column } from '$routes/column/schema.server';
export { job } from '$routes/job/schema.server';
export { customer } from '$routes/customer/schema.server';


export const user = sqliteTable('user', {
	id: text().primaryKey(),
	created: integer('created', { mode: 'timestamp' }).notNull().default(new Date()),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	email: text('email').notNull().unique(),
	status: text({ enum: ['active', 'inactive'] }).notNull().default('active'),
});





export const item = sqliteTable('item', {
	id: int({ mode: 'number' }).primaryKey({ autoIncrement: true }),
	created: integer('created', { mode: 'timestamp' }).notNull().default(new Date()),
	description: text('description').notNull(),
});

export const jobItems = sqliteTable('job_items', {
	id: int({ mode: 'number' }).primaryKey({ autoIncrement: true }),
	created: integer('created', { mode: 'timestamp' }).notNull().default(new Date()),
	quantity: integer('quantity').notNull(),
	jobId: text('job_id').references(() => job.id, {
		onDelete: 'cascade',
	}),
	itemId: text('item_id').references(() => item.id, {
		onDelete: 'cascade',
	}),
})

export const session = sqliteTable('session', {
	id: int({ mode: 'number' }).primaryKey({ autoIncrement: true }),
	created: integer('created', { mode: 'timestamp' }).notNull().default(new Date()),
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
