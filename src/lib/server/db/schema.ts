import { customer } from '../../../routes/content/customer/schema.server';
import { job } from '../../../routes/content/job/schema.server';
import { item } from '../../../routes/content/item/schema.server';
import { column } from '../../../routes/content/column/schema.server';
import { user } from '../../../routes/content/user/schema.server';
import { session } from '../../../routes/content/session/schema.server';
import { jobItems } from '../../../routes/content/jobItems/schema.server';
import { login } from '../../../routes/content/login/schema.server';

import { relations } from 'drizzle-orm';
// import { sqliteTable, integer, text, int, } from 'drizzle-orm/sqlite-core';

export { customer, item, job, column, user, session, jobItems, login }

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