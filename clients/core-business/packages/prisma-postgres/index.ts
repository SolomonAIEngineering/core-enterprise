import { PrismaClient } from "@prisma/client";

export const prisma =
  global.prismaPostgres ||
  new PrismaClient({
    omit: {
      user: { passwordHash: true },
    },
  });

declare global {
  var prismaPostgres:
    | PrismaClient<{ omit: { user: { passwordHash: true } } }>
    | undefined;
}

if (process.env.NODE_ENV === "development") global.prismaPostgres = prisma;
