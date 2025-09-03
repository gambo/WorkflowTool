import { form, getRequestEvent, query } from "$app/server";
import { db } from "$lib/db";
import type { RemoteForm } from "@sveltejs/kit";
import { asc, desc, eq, getTableColumns, getTableName, Table } from 'drizzle-orm'
import { createUpdateSchema, type BuildRefine } from "drizzle-zod";
import z, { ZodType } from 'zod'
import type { $ZodIssue } from 'zod/v4/core';
import { audit } from "./schema";

type AddType = RemoteForm<
    | { status: 'success'; message: string }
    | { status: 'fail'; error: $ZodIssue[] | string }
>
type EditType = RemoteForm<
    | { status: 'success'; message: string }
    | { status: 'fail'; error: $ZodIssue[] | string }
>

type CrudConfig<T extends Table> = {
    label: string;
    table: T
    refinements: RefineSchema<T>
}
export type RefineSchema<TTable extends Table> = BuildRefine<
    TTable["_"]["columns"],
    undefined
>;

export const crud = <T extends Table>(config: CrudConfig<T>) => {
    const { label, table, refinements } = config;
    const insertSchema = createUpdateSchema(table, refinements);
    const editSchema = createUpdateSchema(table, refinements);
    const list = query(async () => {
        const ret = await db.select().from(table as T)
        const { locals } = await getRequestEvent()
        await db.insert(audit).values({
            message: 'user did list stuff',
            payload: locals
        })
        return ret
    })

    const list_asc_by = query(z.string(), async (str: string) => {
        const cols = getTableColumns(table)[str]
        return await db.select().from(table).orderBy(asc(cols))
    })
    const list_desc_by = query(z.string(), async (str: string) => {
        const cols = getTableColumns(table)[str]
        return await db.select().from(table).orderBy(desc(cols))
    })

    const find_by_id = query(z.union([z.int(), z.string()]), async (id_to_del) => {
        if (!id_to_del) throw new Error('No ID provided')
        const { id } = getTableColumns(table)
        return await db.select().from(table).where(eq(id, id_to_del))
    })

    const add: AddType = form(async (data) => {
        const invalid = Object.fromEntries(data.entries())
        const values = await insertSchema.safeParseAsync(invalid)
        if (values.success) {
            try {
                await db.insert(table).values(values.data)
                await list().refresh()
            } catch (e) {
                let err = 'Unknown error'
                if (e instanceof Error) {
                    err = e.message
                }
                await db.insert(audit).values({
                    message: 'user added something and it failed',
                    payload: err
                })
                return { status: 'fail', error: err }
            }
            await db.insert(audit).values({
                message: 'user added stuff',
                payload: values.data
            })
            return { status: 'success', message: `Successfully added new ${label}` }
        } else {
            return { status: 'fail', error: values.error.issues }
        }
    })


    const edit: EditType = form(async (data) => {
        const invalid = Object.fromEntries(data.entries())
        const id_to_edit = invalid['id']
        const values = await editSchema.safeParseAsync(invalid)
        if (values.success) {
            try {
                const { id } = getTableColumns(table)
                await db.update(table).set(values.data).where(eq(id, id_to_edit))
                await list().refresh()
                return { status: 'success', message: `Successfully edited new column` }
            } catch (e) {
                let err = 'Unknown error'
                if (e instanceof Error) {
                    err = e.message
                }
                return { status: 'fail', error: err }
            }
        } else {
            return { status: 'fail', error: values.error.issues }
        }
    })

    const del = form(async (data) => {
        const id_to_delete = data.get('id')
        if (typeof id_to_delete === 'string') {
            const { id } = getTableColumns(table)
            const name = getTableName(table)
            await db.delete(table).where(eq(id, parseInt(id_to_delete)))
            await list().refresh()
            await db.insert(audit).values({
                message: 'user deleted stuff',
                payload: { name, id_to_delete }
            })
            return { status: 'success', message: 'Successfully deleted' }
        } else {
            return { status: 'fail', message: 'Could not delete' }
        }
    })
    return { list, add, del, edit, find_by_id, list_asc_by, list_desc_by }
}
type ToJSONSchemaParams = Parameters<typeof z.toJSONSchema>;
export const toJSONSchema = <T extends ZodType>(schema: T) => {
    const params = {
        unrepresentable: "any",
        override: (ctx) => {
            const def = ctx.zodSchema._zod.def;
            if (def.type === "date") {
                ctx.jsonSchema.type = "string";
                ctx.jsonSchema.format = "date-time";
            }
        },
    } satisfies ToJSONSchemaParams[1];
    const jsonSchema = z.toJSONSchema(schema, params);
    return jsonSchema;
}
