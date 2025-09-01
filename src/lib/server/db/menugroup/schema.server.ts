import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, type BuildRefine } from "drizzle-zod";
// import z from "zod";

export const menugroup = sqliteTable('menugroup', {
    id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
    created: integer('created', { mode: 'timestamp' }).notNull().default(new Date()),
    label: text('label').unique().notNull(),
});

export const refinements = {
    id: z => z.meta({ widget: 'hidden' }),
    created: z => z.meta({ widget: 'hidden' }),
} satisfies BuildRefine<typeof menugroup, undefined>

export const schema = createInsertSchema(menugroup, refinements);

export const config = {
    label: 'Menu Group',
    table: menugroup,
    refinements,
}