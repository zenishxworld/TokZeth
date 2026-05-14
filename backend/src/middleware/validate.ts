import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { VALID_MODES } from "../types";

const RefineSchema = z.object({
  text: z
    .string()
    .min(1, "text cannot be empty")
    .max(10000, "text exceeds 10,000 character limit"),
  mode: z.enum(VALID_MODES as [string, ...string[]]),
  userId: z.string().optional(),
});

export function validateRefineRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const result = RefineSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      success: false,
      error: result.error.errors.map((e) => e.message).join(", "),
    });
    return;
  }

  next();
}
