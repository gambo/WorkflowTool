import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, type BuildRefine } from "drizzle-zod";
// import z from "zod";
// import { user } from "../schema";

export const audit = sqliteTable('audit', {
    id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
    created: integer('created', { mode: 'timestamp' }).notNull().default(new Date()),
    // userid: integer('userid').references(() => user.id).notNull(),
    message: text('label').notNull(),
    payload: text({ mode: 'json' }),
});


// type LookupReference = {
//     widget: string
//     table: string
//     key: keyof typeof user
//     label: keyof typeof user
// }

export const refinements = {
    id: z => z.meta({ widget: 'hidden' }),
    created: z => z.meta({ widget: 'hidden' }),
    // userid: z.coerce.number().meta({ widget: 'lookup', table: 'user', key: 'id', label: 'username' } satisfies LookupReference),
} satisfies BuildRefine<typeof audit, undefined>



export const schema = createInsertSchema(audit, refinements);

export const config = {
    label: 'Audit',
    description: 'Investigate Audit Trails',
    table: audit,
    refinements,
}

export const table_config = {
    payload: 'json'
}