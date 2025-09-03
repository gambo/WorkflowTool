import { command } from "$app/server";
import { crud } from "$lib/db/helper";
import { db } from "..";
import { audit, config, schema } from "./schema.server";
// import z from "zod";

export const { list, add, del, edit, find_by_id, list_asc_by, list_desc_by } = crud(config);

type LogData = typeof audit.$inferInsert
export const log = command(schema, (logdata: LogData) => {
    db.insert(audit).values(logdata)
})