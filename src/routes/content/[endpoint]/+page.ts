export async function load({ data }) {
    const { endpoint } = data
    const { list, list_desc_by, list_asc_by, add, del, edit } = await import(`$lib/db/${endpoint}/funcs.remote.ts`).then(x => x)
    return { ...data, pageTitle: "App Columns", list, list_desc_by, list_asc_by, add, del, edit, endpoint };
}