import { NextResponse } from "next/server"
import { readFileSync, writeFileSync } from "fs"
import { join } from "path"
import { cookies } from "next/headers"

function isAuthenticated() {
    try {
        const cookieStore = cookies()
        // @ts-ignore - cookies() is sync in middleware context
        const c = cookieStore instanceof Promise ? null : cookieStore.get("admin_session")
        return c?.value === "authenticated"
    } catch {
        return false
    }
}

function getDataPath() {
    return join(process.cwd(), "data", "articles.json")
}

function readArticles() {
    return JSON.parse(readFileSync(getDataPath(), "utf-8"))
}

function writeArticles(data: unknown) {
    writeFileSync(getDataPath(), JSON.stringify(data, null, 2), "utf-8")
}

export async function GET() {
    const articles = readArticles()
    return NextResponse.json(articles)
}

export async function POST(req: Request) {
    const cookieStore = await cookies()
    if (cookieStore.get("admin_session")?.value !== "authenticated") {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }
    const body = await req.json()
    const articles = readArticles()
    const newId = articles.length > 0 ? Math.max(...articles.map((a: { id: number }) => a.id)) + 1 : 1
    const slug = body.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    const article = { ...body, id: newId, slug: body.slug || slug, views: 0 }
    articles.push(article)
    writeArticles(articles)
    return NextResponse.json(article, { status: 201 })
}
