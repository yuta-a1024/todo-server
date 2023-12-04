import express from "express";
import type { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app: Express = express();
const PORT = 8080;

//ミドルウェアでjson形式を認識させる
app.use(express.json());

//corsエラーの回避
app.use(cors());

//インスタンス化
const prisma = new PrismaClient();

// 全てのtodoを取得するAPIを作成(getメソッドはブラウザで確認可能、putやdeleteは確認不可)
app.get("/allTodos", async (req: Request, res: Response) => {
  const allTodos = await prisma.todo.findMany();
  return res.json(allTodos);
});

//createのAPIを作成
app.post("/createTodo", async (req: Request, res: Response) => {
  // console.log(req.body);
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
    return res.status(400).json(e);
  }
});

//edit(update)のAPIを作成
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
    return res.status(400).json(e);
  }
});

//deleteのAPIを作成
app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
  try {
    //Number型にキャスト
    const id = Number(req.params.id);
    const deleteTodo = await prisma.todo.delete({
      where: { id },
    });
    return res.json(deleteTodo);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.listen(PORT, () => console.log("🚀server is running🚀"));
