// import { hash } from '@node-rs/argon2';
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, type BuildRefine } from "drizzle-zod";

export const login = sqliteTable('login', {
    id: integer().primaryKey({ autoIncrement: true }),
    created: integer('created', { mode: 'timestamp' }).notNull().default(new Date()),
    username: text('username').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
});

export const refinements = {
    id: z => z.meta({ widget: 'hidden' }),
    // passwordHash: z => z.transform(async (x) => await create_password(x)).meta({ widget: 'password', label: "Password" }),
    created: z => z.meta({ widget: 'hidden' }),
} satisfies BuildRefine<typeof login, undefined>

export const schema = createInsertSchema(login, refinements);

export const config = {
    code: 'login',
    label: 'Login',
    table: login,
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