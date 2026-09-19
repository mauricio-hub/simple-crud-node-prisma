import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";



export abstract class TodoRepository {
    abstract createTodo(createTodoDto:CreateTodoDto ): Promise<TodoEntity>;

    abstract getAll(): Promise<TodoEntity[]>;

    abstract findById(id:number): Promise<TodoEntity>;

    abstract updateById(updateTodoDto:UpdateTodoDto): Promise<TodoEntity>;

    abstract deleteById(id:number): Promise<TodoEntity>;



}