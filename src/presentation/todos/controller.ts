import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

/* const todos = [
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Buy bread', completedAt: null },
    { id: 3, text: 'Buy eggs', completedAt: new Date() }
]
 */

export class TodosController {

    //DI 
    constructor(
        private readonly todoRepository: TodoRepository,
    ) { }

    public getTodos = async (req: Request, res: Response) => {
        const todo = await this.todoRepository.getAll();
        return res.json(todo);

    }



    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;

        try {
            const todo = await this.todoRepository.findById(id);
            res.json(todo);

        } catch (error) {
            return res.status(400).json({ message: 'Internal server error', error });
        }

    }



    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) {
            return res.status(400).json({ error });
        }

        const todo = await this.todoRepository.createTodo(createTodoDto!);


        res.json({ message: 'Todo created successfully', todo });
    }


    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.create({ id, ...req.body });

        if (error) {
            return res.status(400).json({ error });
        }

        const todo = await this.todoRepository.updateById(updateTodoDto!);

        res.json({ message: 'Todo updated successfully', todo });
    }


    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }



        await this.todoRepository.deleteById(id);

        res.json({ message: 'Todo deleted successfully' });
    }

}