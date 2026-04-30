import { NextResponse } from "next/server"
import { readFileSync, writeFileSync } from "fs"
import { join } from "path"
import { cookies } from "next/headers"

function getDataPath() {
    return join(process.cwd(), "data", "articles.json")
}
function readArticles() {
    return JSON.parse(readFileSync(getDataPath(), "utf-8"))
}
function writeArticles(data: unknown) {
    writeFileSync(getDataPath(), JSON.stringify(data, null, 2), "utf-8")
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const articles = readArticles()
    const article = articles.find((a: { id: number }) => a.id === parseInt(id))
    if (!article) return NextResponse.json({ error: "Non trouvé" }, { status: 404 })
    return NextResponse.json(article)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const cookieStore = await cookies()
    if (cookieStore.get("admin_session")?.value !== "authenticated") {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }
    const body = await req.json()
    const articles = readArticles()
    const idx = articles.findIndex((a: { id: number }) => a.id === parseInt(id))
    if (idx === -1) return NextResponse.json({ error: "Non trouvé" }, { status: 404 })
    articles[idx] = { ...articles[idx], ...body, id: parseInt(id) }
    writeArticles(articles)
    return NextResponse.json(articles[idx])
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const cookieStore = await cookies()
    if (cookieStore.get("admin_session")?.value !== "authenticated") {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }
    const articles = readArticles()
    const filtered = articles.filter((a: { id: number }) => a.id !== parseInt(id))
    writeArticles(filtered)
    return NextResponse.json({ ok: true })
}
