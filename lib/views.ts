"use server"

import fs from 'fs/promises'
import path from 'path'

const viewsFilePath = path.join(process.cwd(), 'data/views.json')

export async function getViews() {
    try {
        const data = await fs.readFile(viewsFilePath, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        console.error('Error reading views:', error)
        return {}
    }
}

export async function incrementViews(slug: string) {
    try {
        const data = await fs.readFile(viewsFilePath, 'utf8')
        const views = JSON.parse(data)

        views[slug] = (views[slug] || 0) + 1

        await fs.writeFile(viewsFilePath, JSON.stringify(views, null, 2), 'utf8')
        return views[slug]
    } catch (error) {
        // If file doesn't exist, create it with initial value
        try {
            const views = { [slug]: 1 }
            await fs.mkdir(path.dirname(viewsFilePath), { recursive: true })
            await fs.writeFile(viewsFilePath, JSON.stringify(views, null, 2), 'utf8')
            return 1
        } catch (innerError) {
            console.error('Error incrementing views:', innerError)
            return 0
        }
    }
}
