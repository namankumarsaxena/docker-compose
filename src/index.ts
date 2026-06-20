import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const app = express()

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prismaClient = new PrismaClient({adapter}) ;


app.get("/", async (req, res) => {
    const data = await prismaClient.user.findMany()
    res.json({
        data
    })
})

app.post("/", async (req, res) => {
    await prismaClient.user.create({
        data: {
            username: Math.random().toString(),
            password: Math.random().toString()
        }
    })
    res.json({
        "message": "Post endpoints"
    })
})

app.listen(3000);