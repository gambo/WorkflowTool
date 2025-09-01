// import { hash } from '@node-rs/argon2';
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, type BuildRefine } from "drizzle-zod";
import z from "zod";
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
    email: z.email().meta({ widget: 'email' }),
    // passwordHash: z => z.transform(async (x) => await create_password(x)).meta({ widget: 'password' }),
    created: z => z.meta({ widget: 'hidden' }),
} satisfies BuildRefine<typeof user, undefined>

export const schema = createInsertSchema(user, refinements);

export const config = {
    code: 'user',
    label: 'User',
    table: user,
    refinements,
}

// const hash_config = {
//     // recommended minimum parameters
//     memoryCost: 19456,
//     timeCost: 2,
//     outputLen: 32,
//     parallelism: 1
// }
// const create_password = async (password: string) => await hash(password, hash_config);