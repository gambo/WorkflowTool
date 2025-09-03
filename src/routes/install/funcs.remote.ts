import { form } from "$app/server";
import { db } from "$lib/db";
import { menu, menugroup } from "$lib/db/schema";

export const doit = form(async () => {
    const admin_group = await db.insert(menugroup).values(
        {
            label: "Admin",
        }
    ).returning({ id: menugroup.id })
    await db.insert(menu).values([
        { label: 'Audit', path: '/content/audit', menugroup: admin_group[0].id, order: 1 },
        { label: 'Menu Items', path: '/content/menu', menugroup: admin_group[0].id, order: 1 },
        { label: 'Menu Groups', path: '/content/menugroup', menugroup: admin_group[0].id, order: 1 },
        { label: 'Column', path: '/content/column', menugroup: admin_group[0].id, order: 1 },
        { label: 'Customer', path: '/content/customer', menugroup: admin_group[0].id, order: 1 },
        { label: 'Item', path: '/content/item', menugroup: admin_group[0].id, order: 1 },
        { label: 'Job', path: '/content/job', menugroup: admin_group[0].id, order: 1 },
        { label: 'Job Items', path: '/content/jobItems', menugroup: admin_group[0].id, order: 1 },
        { label: 'Login', path: '/content/login', menugroup: admin_group[0].id, order: 1 },
        { label: 'Session', path: '/content/session', menugroup: admin_group[0].id, order: 1 },
        { label: 'User', path: '/content/user', menugroup: admin_group[0].id, order: 1 },
    ])
})