import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, type BuildRefine } from "drizzle-zod";
import z from "zod";

export const column = sqliteTable('column', {
    id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
    created: integer('created', { mode: 'timestamp' }).notNull().default(new Date()),
    column: text('column').notNull(),
    color: text('color').notNull(),
    description: text('description').notNull(),
    order: integer('order'),
    check: integer('check', { mode: 'boolean' }).default(false)
});

export const refinements = {
    id: z => z.meta({ widget: 'hidden' }),
    color: z => z.meta({ widget: 'color' }),
    created: z => z.meta({ widget: 'hidden' }),
    order: z.coerce.number(),
    check: z.coerce.boolean()
} satisfies BuildRefine<typeof column, undefined>

export const schema = createInsertSchema(column, refinements);