import { Request, Response } from "express";


const todos = [
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Buy bread', completedAt: null },
    { id: 3, text: 'Buy eggs', completedAt: new Date() }
]


export class TodosController {

    //DI 
    constructor() {

    }

    public async getTodos(req: Request, res: Response) {
        return res.json(todos);
    }



    public async getTodoById(req: Request, res: Response) {
        const id = +req.params.id;

        
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        
        const todo = todos.find(todo => todo.id === id)

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        return res.json(todo);



    }



    public async createTodo(req: Request, res: Response) {
        const {text} = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }

        const newTodo = { id: todos.length + 1, text, completedAt: new Date() }

        todos.push(newTodo);

        res.json({ message: 'Todo created successfully' , todo: newTodo });
    }


    public async updateTodo(req: Request, res: Response) {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const todo = todos.find(todo => todo.id === id)

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }


        const { text , completedAt } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }

        todo.text = text || todo.text;
        (completedAt === null) ? todo.completedAt = null : todo.completedAt = new Date(completedAt || todo.completedAt);


        res.json({ message: 'Todo updated successfully', todo });
    }


    public async deleteTodo(req: Request, res: Response) {
        const id = +req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const index = todos.find(todo => todo.id === id)

        if (!index) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todos.splice(todos.indexOf(index), 1);

        res.json({ message: 'Todo deleted successfully' });
    }

}