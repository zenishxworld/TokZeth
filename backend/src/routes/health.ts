import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "tokzeth-backend",
    timestamp: new Date().toISOString(),
  });
});

export default router;
