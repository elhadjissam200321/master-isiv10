import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export async function POST(req: Request) {
    const { password } = await req.json()
    if (password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 })
    }
    const res = NextResponse.json({ ok: true })
    res.cookies.set("admin_session", "authenticated", {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 8, // 8 hours
    })
    return res
}

export async function DELETE() {
    const res = NextResponse.json({ ok: true })
    res.cookies.delete("admin_session")
    return res
}

export async function GET() {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin_session")
    return NextResponse.json({ authenticated: session?.value === "authenticated" })
}
