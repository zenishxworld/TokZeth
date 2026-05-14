import { Router, type Request, type Response, type NextFunction } from "express";
import { validateRefineRequest } from "../middleware/validate";
import { refineText } from "../services/refine.service";
import type { RefineRequest } from "../types";

const router = Router();

router.post(
  "/",
  validateRefineRequest,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { text, mode, userId } = req.body as RefineRequest;
      const result = await refineText(text, mode, userId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
