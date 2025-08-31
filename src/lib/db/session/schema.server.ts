import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "../user/schema.server";
import { createInsertSchema, type BuildRefine } from "drizzle-zod";
// import z from "zod";

export const session = sqliteTable('session', {
    id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
    created: integer('created', { mode: 'timestamp' }).notNull().default(new Date()),
    userId: text('user_id')
        .notNull()
        .references(() => user.id),
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
});

export const refinements = {
    id: z => z.meta({ widget: 'hidden' }),
    created: z => z.meta({ widget: 'hidden' }),
} satisfies BuildRefine<typeof session, undefined>

export const schema = createInsertSchema(session, refinements);

export const config = {
    label: 'Session',
    table: session,
    refinements,
}