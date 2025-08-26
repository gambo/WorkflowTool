import { customer } from '../../../routes/customer/schema.server';
import { job } from '../../../routes/job/schema.server';
import { item } from '../../../routes/item/schema.server';
import { column } from '../../../routes/column/schema.server';
import { user } from '../../../routes/user/schema.server';
import { session } from '../../../routes/session/schema.server';

import { relations } from 'drizzle-orm';
import { sqliteTable, integer, text, int, } from 'drizzle-orm/sqlite-core';

export { customer, item, job, column, user, session }



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