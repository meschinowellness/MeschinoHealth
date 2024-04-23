import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';

const db = new PrismaClient();

export const GET = async (req) => {
    try {
        const users = await db.nmu.findMany({
            orderBy: [
                { author: 'desc' }
            ]
        });
        return NextResponse.json({ users, status: 200 })
    } catch (error) {
        console.log(error);
    }
}
