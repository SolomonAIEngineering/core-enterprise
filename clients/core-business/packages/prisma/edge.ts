import { Client } from "@planetscale/database";
import { PrismaClient } from "@prisma/client";
import { PrismaPlanetScale } from "@prisma/adapter-planetscale";

const client = new Client({ url: process.env.DATABASE_URL });

const adapter = new PrismaPlanetScale(client);

export const prismaEdge = new PrismaClient({
    adapter,
});