import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), "public", "uploads")
        try {
            await fs.access(uploadDir)
        } catch {
            await fs.mkdir(uploadDir, { recursive: true })
        }

        const fileExtension = path.extname(file.name)
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${fileExtension}`
        const filePath = path.join(uploadDir, fileName)

        await fs.writeFile(filePath, buffer)

        return NextResponse.json({
            success: true,
            url: `/uploads/${fileName}`
        })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
    }
}
