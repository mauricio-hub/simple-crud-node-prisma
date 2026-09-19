import { Router } from "express";
import { TodosController } from "./controller";
import { todoRepositoryImpl } from "../../infrastructure/repositories/todo.respositories.impl";
import { todoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";


export class TodosRoutes {
   
    static get routes():Router {
        
        const router = Router();

        const datasource = new todoDatasourceImpl();
        const todoRepository = new todoRepositoryImpl(datasource);
        const todoController = new TodosController(todoRepository);

      
        
        router.get('/',  todoController.getTodos);
        router.get('/:id',  todoController.getTodoById);
        
        router.post('/',  todoController.createTodo);
        router.put('/:id',  todoController.updateTodo);
        router.delete('/:id',  todoController.deleteTodo);



        return router;
    }
}