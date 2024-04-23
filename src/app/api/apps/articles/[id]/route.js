import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';

const db = new PrismaClient();

export const GET = async (req, { params }) => {
    const id = parseInt(params.id);
    try {
        const article = await db.nmu.findUnique({
            where: { id: id },
            select: {
                topic: true,
                source: true,
                author: true,
                thumbnail: true,
                youtubeLink: true,
                shortDescription: true,
                longDescription: true
            }
        });
        console.log(article)
        if (article) {
            return NextResponse.json({ article, status: 200 });
        } else {
            return NextResponse.json({ error: 'Article not found', status: 404 });
        }
    } catch (error) {
        console.log(error);
    }
}

export const PUT = async (req, { params }) => {
    const id = parseInt(params.id);
    try {
        const data = await req.formData();

        const topic = data.get('topic');
        const source = data.get('source');
        const author = data.get('author');
        const youtubeLink = data.get('youtubeLink');
        const shortDescription = data.get('shortDescription');
        const longDescription = data.get('longDescription');

        const image = data.get('thumbnail');
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const newImagePath = `public/uploads/articles/${image.name}`;
        await writeFile(newImagePath, buffer);

        if (data.has('thumbnail')) {
            const article = await db.nmu.findUnique({ where: { id: id } });
            if (article && article.thumbnail) {
                await unlink(join(process.cwd(), article.thumbnail));
            }
        }

        const updatedArticle = {
            topic: topic,
            source: source,
            author: author,
            youtubeLink: youtubeLink,
            shortDescription: shortDescription,
            longDescription: longDescription,
            thumbnail: newImagePath,
        };

        const updateduser = await db.nmu.update({
            where: { id: id },
            data: updatedArticle,
        });
        console.log(updateduser)
        return NextResponse.json({ updateduser, status: 200 });
    } catch (error) {
        console.log(error);
    }
}

export const DELETE = async (req, { params }) => {
    console.log('hi')
    const id = parseInt(params.id);
    try {
        const article = await db.nmu.findUnique({
            where: { id: id },
            select: { thumbnail: true }
        });

        if (article) {
            if (article.thumbnail) {
                await unlink(article.thumbnail);
            }
            await db.nmu.delete({ where: { id: id } });
            return NextResponse.json({ message: 'Article deleted successfully', status: 200 });
        } else {
            return NextResponse.json({ error: 'Article not found', status: 404 });
        }
    } catch (error) {
        console.error(error);
    }
};