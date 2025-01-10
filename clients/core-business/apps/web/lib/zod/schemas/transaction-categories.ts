import { booleanQuerySchema, getPaginationQuerySchema } from "./misc";

import z from "@/lib/zod";
import { TransactionCategoryColorProps } from "@/ui/transactions/transaction-category-badge";

export const TRANSACTION_CATEGORIES_MAX_PAGE_SIZE = 100;

export const getTransactionCategoriesQuerySchema = z
  .object({
    search: z
      .string()
      .optional()
      .describe("The search term to filter the categories by."),
    ids: z
      .union([z.string(), z.array(z.string())])
      .transform((v) => (Array.isArray(v) ? v : v.split(",")))
      .optional()
      .describe("IDs of categories to filter by."),
  })
  .merge(
    getPaginationQuerySchema({
      pageSize: TRANSACTION_CATEGORIES_MAX_PAGE_SIZE,
    }),
  );

export const getTransactionCategoriesQuerySchemaExtended =
  getTransactionCategoriesQuerySchema.merge(
    z.object({
      includeTransactionsCount: booleanQuerySchema.default("false"),
    }),
  );

export const getTransactionCategoriesCountQuerySchema =
  getTransactionCategoriesQuerySchema.omit({
    ids: true,
    page: true,
    pageSize: true,
  });

export const createTransactionCategoryBodySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(50)
    .describe("The name of the category to create."),
  description: z
    .string()
    .trim()
    .optional()
    .describe("Optional description for the category."),
  color: z
    .custom<TransactionCategoryColorProps>()
    .optional()
    .describe("The color of the category badge."),
  icon: z
    .string()
    .nullable()
    .optional()
    .describe("Icon identifier for the category."),
  parentId: z
    .string()
    .nullable()
    .optional()
    .describe("Optional parent category ID for hierarchical categories."),
  isSystem: z
    .boolean()
    .optional()
    .default(false)
    .describe("Whether this is a system-defined category."),
  isActive: z
    .boolean()
    .optional()
    .default(true)
    .describe("Whether this category is active."),
  // Budget and Analysis
  budgetLimit: z
    .number()
    .optional()
    .describe("Monthly budget limit for this category."),
  warningThreshold: z
    .number()
    .optional()
    .describe("Threshold percentage for budget warnings."),
  trackingEnabled: z
    .boolean()
    .optional()
    .default(true)
    .describe("Whether to track budget for this category."),
  // Tax Information
  vatRate: z
    .number()
    .nullable()
    .optional()
    .describe("VAT/Tax rate for this category."),
  taxCode: z
    .string()
    .nullable()
    .optional()
    .describe("Tax code for reporting purposes."),
  taxDeductible: z
    .boolean()
    .optional()
    .default(false)
    .describe("Whether expenses in this category are tax deductible."),
  // Additional Metadata
  metadata: z
    .record(z.any())
    .nullable()
    .optional()
    .describe("Additional metadata for the category."),
});

export const updateTransactionCategoryBodySchema =
  createTransactionCategoryBodySchema.partial();

export const TransactionCategorySchema = z
  .object({
    id: z.string().describe("The unique ID of the category."),
    name: z.string().describe("The name of the category."),
    slug: z.string().describe("URL-friendly version of the name."),
    description: z
      .string()
      .nullable()
      .describe("Optional description of the category."),
    color: z
      .custom<TransactionCategoryColorProps>()
      .describe("The color of the category badge.")
      .optional(),
    icon: z
      .string()
      .nullable()
      .describe("Icon identifier for the category.")
      .optional(),
    parentId: z
      .string()
      .nullable()
      .describe("ID of the parent category if any.")
      .optional(),
    path: z
      .string()
      .nullable()
      .describe("Materialized path in category hierarchy.")
      .optional(),
    level: z
      .number()
      .describe("Depth level in the category hierarchy.")
      .optional()
      .default(0),
    isSystem: z
      .boolean()
      .describe("Whether this is a system-defined category.")
      .optional()
      .default(false),
    isActive: z
      .boolean()
      .describe("Whether this category is active.")
      .optional()
      .default(true),
    // Budget and Analysis
    budgetLimit: z
      .number()
      .nullable()
      .describe("Monthly budget limit for this category.")
      .optional(),
    warningThreshold: z
      .number()
      .nullable()
      .describe("Threshold percentage for budget warnings.")
      .optional(),
    trackingEnabled: z
      .boolean()
      .describe("Whether to track budget for this category.")
      .optional(),
    // Tax Information
    vatRate: z
      .number()
      .nullable()
      .describe("VAT/Tax rate for this category.")
      .optional()
      .default(0),
    taxCode: z
      .string()
      .nullable()
      .describe("Tax code for reporting purposes.")
      .optional()
      .default(""),
    taxDeductible: z
      .boolean()
      .describe("Whether expenses in this category are tax deductible.")
      .optional()
      .default(false),
    // Additional Metadata
    metadata: z
      .record(z.any())
      .nullable()
      .describe("Additional metadata for the category.")
      .optional(),
    // System fields
    createdAt: z
      .date()
      .describe("When the category was created.")
      .optional()
      .default(new Date()),
    updatedAt: z
      .date()
      .describe("When the category was last updated.")
      .optional()
      .default(new Date()),
  })
  .openapi({
    title: "TransactionCategory",
  });
