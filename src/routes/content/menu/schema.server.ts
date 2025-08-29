import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, type BuildRefine } from "drizzle-zod";
import z from "zod";

export const menu = sqliteTable('menu', {
    id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
    created: integer('created', { mode: 'timestamp' }).notNull().default(new Date()),
    label: text('label').notNull(),
    path: text('path').notNull(),
    order: integer('order').notNull(),
});

export const refinements = {
    id: z => z.meta({ widget: 'hidden' }),
    created: z => z.meta({ widget: 'hidden' }),
    order: z.coerce.number().min(0, 'Order must gt 0').meta({ widget: 'number' }),
} satisfies BuildRefine<typeof menu, undefined>



export const schema = createInsertSchema(menu, refinements);

export const config = {
    label: 'Menu',
    table: menu,
    refinements,
}