import { audit } from './audit/schema.server';
import { customer } from './customer/schema.server';
import { job } from './job/schema.server';
import { item } from './item/schema.server';
import { table as column } from './column/schema.server';
import { user } from './user/schema.server';
import { session } from './session/schema.server';
import { jobItems } from './jobItems/schema.server';
import { login } from './login/schema.server';
import { menu } from './menu/schema.server';
import { menugroup } from './menugroup/schema.server';
import { page } from './page/schema.server';
import { relations } from 'drizzle-orm';

export { audit, customer, item, job, column, user, session, jobItems, login, menu, menugroup, page }

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