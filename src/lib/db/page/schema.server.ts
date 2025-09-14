// import { hash } from '@node-rs/argon2';
import type { AutoTableType } from "$lib/Components/AutoTable.svelte";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, type BuildRefine } from "drizzle-zod";
// import z from "zod";

export const page = sqliteTable('page', {
    id: integer().primaryKey({ autoIncrement: true }),
    created: integer('created', { mode: 'timestamp' }).notNull().default(new Date()),
    name: text('name').notNull().unique(),
    title: text('title'),
    description: text('description'),
    status: text({ enum: ['active', 'inactive'] }).notNull().default('active'),
});

export const refinements = {
    id: z => z.meta({ widget: 'hidden' }),
    created: z => z.meta({ widget: 'hidden' }),
} satisfies BuildRefine<typeof page, undefined>

export const schema = createInsertSchema(page, refinements);

export const config = {
    label: 'page',
    description: 'Manage pages',
    table: page,
    refinements,
}

export const table_config = {
    id: 'number',
    created: 'date'
} satisfies Partial<Record<keyof typeof page['$inferInsert'], AutoTableType>>