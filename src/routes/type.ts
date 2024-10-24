import { PrismaClient } from "@prisma/client";
import { Response, Request, Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response) => {
  const type = await prisma.types.create({
    data: {
      name: req.body.name,
    },
  });

  res.status(201).json({ message: "success", data: type });
});

router.get("/", async (req: Request, res: Response) => {
  const types = await prisma.types.findMany();

  res.status(200).json({ message: "success", data: types });
});

router.get("/:id", async (req: Request, res: Response) => {
  const type = await prisma.types.findFirst({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res
    .status(type === null ? 404 : 200)
    .json({ message: "success", data: type || "not found" });
});

const typeRoute = router;

export default typeRoute;
