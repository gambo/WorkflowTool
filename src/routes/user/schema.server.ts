import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, type BuildRefine } from "drizzle-zod";
// import z from "zod";

export const user = sqliteTable('user', {
    id: integer().primaryKey({ autoIncrement: true }),
    created: integer('created', { mode: 'timestamp' }).notNull().default(new Date()),
    username: text('username').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    email: text('email').notNull().unique(),
    status: text({ enum: ['active', 'inactive'] }).notNull().default('active'),
});

export const refinements = {
    id: z => z.meta({ widget: 'hidden' }),
    passwordHash: z => z.transform(() => '******').meta({ widget: 'password' }),
    created: z => z.meta({ widget: 'hidden' }),
} satisfies BuildRefine<typeof user, undefined>

export const schema = createInsertSchema(user, refinements);

export const config = {
    code: 'user',
    label: 'User',
    table: user,
    refinements,
}