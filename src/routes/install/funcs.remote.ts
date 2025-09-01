import { form } from "$app/server";
import { db } from "$lib/server/db";
import { menugroup } from "$lib/server/db/schema";

export const doit = form(async () => {
    const admin_group = db.insert(menugroup).values(
        {
            label: "Admin",
        }
    ).returning({ id: menugroup.id }).then(console.log).catch(console.log)
    console.log(123, admin_group)
})