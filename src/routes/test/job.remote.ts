import { query } from "$app/server"
import { job, item } from "$lib/server/db/schema"
import { db } from "$lib/server/db"
import { eq } from "drizzle-orm"

export const jobWithItems = query(() => {
    return db.select().from(job).leftJoin(item, eq(job.itemId, item.id))
})

export const jobWithSteven = query(() => {
    return db.query.job.findMany({
        with: {
            items: true
        }
    })
})
