import { Task } from "@prisma/client";
import TaskRepository from "../repositories/TaskRepository";


class TaskService {

    async getTasks(): Promise<Array<Task>> {
        return TaskRepository.getTasks();
    }

    async createTask(task: Task): Promise<Task | string> {
        return TaskRepository.createTask(task);
    }

    async getTask(id: number): Promise<Task | null> {
        return TaskRepository.getTask(id);
    }

    async updateTask(id: number, title: string | null, description: string | null, user_id: number | null, task_status_id: number | null): Promise<Task | string > {        
        return TaskRepository.updateTask(id, title, description, user_id, task_status_id);
    }

    async deleteTask(id: number): Promise<Task | string> {        
        return TaskRepository.deleteTask(id);
    }
}


export default new TaskService();