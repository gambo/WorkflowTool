import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, type BuildRefine } from "drizzle-zod";
import { job } from "../job/schema.server";
import { item } from "../item/schema.server";
// import z from "zod";

export const jobItems = sqliteTable('job_items', {
    id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
    created: integer('created', { mode: 'timestamp' }).notNull().default(new Date()),
    quantity: integer('quantity').notNull(),
    jobId: text('job_id').references(() => job.id, {
        onDelete: 'cascade',
    }).notNull(),
    itemId: text('item_id').references(() => item.id, {
        onDelete: 'cascade',
    }).notNull(),
})

export const refinements = {
} satisfies BuildRefine<typeof jobItems, undefined>

export const schema = createInsertSchema(jobItems, refinements);

export const config = {
    label: 'Job Item',
    description: 'Items of the jobs',
    table: jobItems,
    refinements,
}