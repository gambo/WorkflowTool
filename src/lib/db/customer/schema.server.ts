import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, type BuildRefine } from "drizzle-zod";
// import z from "zod";

export const customer = sqliteTable('customer', {
    id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
    created: integer('created', { mode: 'timestamp' }).notNull().default(new Date()),
    name: text('name').notNull(),
    description: text('description'),
});

export const refinements = {
    id: z => z.meta({ widget: 'hidden' }),
    created: z => z.meta({ widget: 'hidden' }),
} satisfies BuildRefine<typeof customer, undefined>

export const schema = createInsertSchema(customer, refinements);

export const config = {
    label: 'Customer',
    table: customer,
    refinements,
}