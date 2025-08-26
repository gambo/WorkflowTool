import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, type BuildRefine } from "drizzle-zod";
import z from "zod";
// import z from "zod";

export const column = sqliteTable('column', {
    id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
    created: integer('created', { mode: 'timestamp' }).notNull().default(new Date()),
    column: text('user').notNull(),
    color: text('color').notNull(),
    description: text('description').notNull(),
    order: integer('order').notNull(),
    check: integer('check', { mode: 'boolean' }).default(false)
});

export const refinements = {
    id: z => z.meta({ widget: 'hidden' }),
    created: z => z.meta({ widget: 'hidden' }),
    color: z => z.meta({ widget: 'color' }),
    order: z.coerce.number().min(0, 'Order must gt 0').meta({ widget: 'number' }),
    check: z.coerce.boolean().meta({ widget: 'checkbox' }),
} satisfies BuildRefine<typeof column, undefined>

export const schema = createInsertSchema(column, refinements);

export const config = {
    label: 'Column',
    table: column,
    refinements,
}