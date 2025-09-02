import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, type BuildRefine } from "drizzle-zod";
import z from "zod";

export const job = sqliteTable('job', {
    id: integer().primaryKey({ autoIncrement: true }),
    created: integer('created', { mode: 'timestamp' }).notNull().default(new Date()),
    quantity: integer('quantity').notNull(),
    description: text('description').notNull(),
    priority: text({ enum: ['high', 'medium', 'low'] }),
    status: text({ enum: ['active', 'inactive'] }),
});

export const refinements = {
    id: z => z.meta({ widget: 'hidden' }),
    created: z => z.meta({ widget: 'hidden' }),
    quantity: z.coerce.number()
} satisfies BuildRefine<typeof job, undefined>

export const schema = createInsertSchema(job, refinements);

export const config = {
    label: 'Jobs',
    description: 'Jobs to do the thing in the place',
}