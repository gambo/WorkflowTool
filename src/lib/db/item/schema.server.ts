import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, type BuildRefine } from "drizzle-zod";
// import z from "zod";


export const item = sqliteTable('item', {
    id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
    created: integer('created', { mode: 'timestamp' }).notNull().default(new Date()),
    description: text('description').notNull().unique(),
});
export const refinements = {
    id: z => z.meta({ widget: 'hidden' }),
    created: z => z.meta({ widget: 'hidden' }),
} satisfies BuildRefine<typeof item, undefined>

export const schema = createInsertSchema(item, refinements);

export const config = {
    label: 'Items',
    description: 'Items to do the thing in the place',
}