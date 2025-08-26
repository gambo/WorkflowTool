import { crud } from "$lib/server/db/helper";
import { config } from "./schema.server";
// import z from "zod";

export const { list, add, del, edit, find_by_id } = crud(config);