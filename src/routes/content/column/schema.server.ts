import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, type BuildRefine } from "drizzle-zod";
import z from "zod";

export const column = sqliteTable('column', {
    id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
    created: integer('created', { mode: 'timestamp' }).notNull().default(new Date()),
    column: text('user').notNull(),
    color: text('color').notNull(),
    description: text('description').notNull(),
    order: integer('order'),
    check: integer('check', { mode: 'boolean' }).default(false)
});

export const refinements = {
    id: z => z.meta({ widget: 'hidden' }),
    color: z => z.meta({ widget: 'color', thinga: 'thang' }),
    created: z => z.meta({ widget: 'hidden' }),
    order: z.coerce.number().min(10, "Order must be at least 10").max(1000, "Order must be at most 1000"),
    check: z.coerce.boolean().optional()
} satisfies BuildRefine<typeof column, undefined>

export const schema = createInsertSchema(column, refinements);

export const config = {
    label: 'Column',
    table: column,
    refinements,
}