import { Request, Response } from "express";
import { prisma } from "../../data/postgres";   
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/todos";

/* const todos = [
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Buy bread', completedAt: null },
    { id: 3, text: 'Buy eggs', completedAt: new Date() }
]
 */

export class TodosController {

    //DI 
    constructor() {}

    public async getTodos(req: Request, res: Response) {
       // return res.json(todos);

        const todos = await prisma.todo.findMany();
        return res.json(todos);
    }



    public async getTodoById(req: Request, res: Response) {
        const id = +req.params.id;

        
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        
        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        })

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        return res.json(todo);



    }



    public async createTodo(req: Request, res: Response) {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) {
            return res.status(400).json({ error });
        }

        const todo =  await prisma.todo.create({
            data: createTodoDto!
        })
      

      res.json({ message: 'Todo created successfully'  });
    }


    public async updateTodo(req: Request, res: Response) {
        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.create({ id, ...req.body });

        if (error) {
            return res.status(400).json({ error });
        }
   
        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        })
   
        if(!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

       

        const updateTodo = await prisma.todo.update({
            where: {
                id: id
            },
            data: updateTodoDto!.values
        })

        res.json({ message: 'Todo updated successfully', updateTodo });
    }


    public async deleteTodo(req: Request, res: Response) {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }



        await prisma.todo.delete({
            where: {
                id: id
            }
        })

        res.json({ message: 'Todo deleted successfully' });
    }

}