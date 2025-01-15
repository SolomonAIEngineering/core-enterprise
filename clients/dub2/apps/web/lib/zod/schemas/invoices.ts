import z from "@/lib/zod";
import { BusinessConfig as platform } from "@dub/platform-config";
import { InvoiceStatus } from "@prisma/client";

export const InvoiceSchema = z.object({
  id: z.string(),
  total: z.number(),
  status: z.nativeEnum(InvoiceStatus).optional(),
  createdAt: z.date(),
  description: z.string().default(`${platform.company} payout`),
  pdfUrl: z.string().nullable(),
});
