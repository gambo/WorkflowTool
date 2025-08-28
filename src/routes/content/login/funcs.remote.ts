import { form } from "$app/server";
import { crud } from "$lib/server/db/helper";
import { config, schema } from "./schema.server";
// import z from "zod";

export const { list, add, del, edit, find_by_id, list_asc_by, list_desc_by } = crud(config);

export const authenticate = form(async (data) => {
    const invalid = Object.fromEntries(data.entries())
    const values = await schema.safeParseAsync(invalid)
    console.log(values)
})