import { NextResponse } from "next/server"
import { readFileSync, writeFileSync } from "fs"
import { join } from "path"
import { cookies } from "next/headers"

function getPath() { return join(process.cwd(), "data", "partners.json") }
function read() { return JSON.parse(readFileSync(getPath(), "utf-8")) }
function write(data: unknown) { writeFileSync(getPath(), JSON.stringify(data, null, 2), "utf-8") }

export async function GET() {
    return NextResponse.json(read())
}

export async function POST(req: Request) {
    const cookieStore = await cookies()
    if (cookieStore.get("admin_session")?.value !== "authenticated")
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    const body = await req.json()
    const list = read()
    const newId = list.length > 0 ? Math.max(...list.map((p: { id: number }) => p.id)) + 1 : 1
    const item = { ...body, id: newId }
    list.push(item)
    write(list)
    return NextResponse.json(item, { status: 201 })
}

export async function DELETE(req: Request) {
    const cookieStore = await cookies()
    if (cookieStore.get("admin_session")?.value !== "authenticated")
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    const { id } = await req.json()
    const list = read()
    write(list.filter((p: { id: number }) => p.id !== id))
    return NextResponse.json({ ok: true })
}
