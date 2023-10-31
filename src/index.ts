import express from "express";
import type { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app:Express = express();
const PORT = 8080;

app.use(express.json());
//corsエラーの回避
app.use(cors());
const prisma = new PrismaClient();

// 全てのtodoListを取得するAPI
app.get("/allTodos", async (req: Request, res: Response) => {
  const allTodos = await prisma.todo.findMany();
  return res.json(allTodos);
});

//create
app.post("/createTodo", async (req: Request, res: Response) => {
  try {
    const { title, isCompleted } = req.body;
    const createTodo = await prisma.todo.create({
      data: {
        title,
        isCompleted,
      },
    });
    return res.json(createTodo);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

//edit(update)
app.put("/editTodo/:id", async (req: Request, res: Response) => {
  try {
    //Number型にキャスト
    const id = Number(req.params.id);
    const { title, isCompleted } = req.body;
    const editTodo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        isCompleted,
      },
    });
    return res.json(editTodo);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

//delete
app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
  try {
    //Number型にキャスト
    const id = Number(req.params.id);
    const { title, isCompleted } = req.body;
    const deleteTodo = await prisma.todo.delete({
      where: { id },
    });
    return res.json(deleteTodo);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

app.listen(PORT, () => console.log("server is running🚀"));
