
import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity } from "../../domain";

export class todoDatasourceImpl implements TodoDatasource {
    createTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<TodoEntity[]> {
        
        const todos = await prisma.todo.findMany();
        
        return todos.map(todo => TodoEntity.fromObject(todo));
    }
    findById(id: number): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }
    updateById(updateTodoDto: CreateTodoDto): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }

}