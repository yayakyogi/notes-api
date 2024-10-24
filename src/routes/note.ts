import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";

const prisma = new PrismaClient();
const router = Router();

// Create Note
router.post("/", async (req: Request, res: Response) => {
  const note = await prisma.note.create({
    data: {
      title: req.body.title,
      content: req.body.content,
      types: {
        connect: req.body.types.map((type: any) => ({ id: parseInt(type) })),
      },
    },
  });

  res.status(201).json({ message: "success", data: note });
});

// Get All Notes
router.get("/", async (req: Request, res: Response) => {
  const note = await prisma.note.findMany({
    include: { types: true },
    where: {
      title: {
        contains: req.query.search?.toString(),
      },
      types: {
        some: {
          name: req.query.type?.toString(),
        },
      },
    },
  });

  res.status(200).json({ message: "success", data: note });
});

// Get Note By Id
router.get("/:id", async (req: Request, res: Response) => {
  const note = await prisma.note.findFirst({
    where: {
      id: parseInt(req.params.id),
    },
    include: {
      types: true,
    },
  });

  res
    .status(note === null ? 404 : 200)
    .json({ message: note === null ? "faild" : "success", data: note });
});

// Update Note
router.put("/:id", async (req: Request, res: Response) => {
  const note = await prisma.note.update({
    where: { id: parseInt(req.params.id) },
    data: {
      title: req.body.title,
      content: req.body.content,
      types: {
        connect: req.body.types.map((type: any) => ({ id: parseInt(type) })),
      },
    },
  });

  res.status(200).json({ message: "success", data: note });
});

// Delete Note
router.delete("/:id", async (req: Request, res: Response) => {
  await prisma.note.delete({ where: { id: parseInt(req.params.id) } });

  res.status(200).send("Deleted successfully");
});

const noteRoute = router;

export default noteRoute;
