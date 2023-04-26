import { Task } from "@prisma/client";
import { prisma } from "../database/db";


class TaskRepository {

    async getTasks(): Promise<Array<Task>> {
        return await prisma.task.findMany();
    }

    async createTask(task: Task): Promise< Task | string > {

        const findDuplicateTask = await prisma.task.count({
            where: {
                title: task.title,
                description: task.description,
                user_id: task.user_id
            }
        });

        if (findDuplicateTask > 0) {
            return "✖️ A tarefa não pode ser criada, porque já existe uma tarefa com as mesmas informações.";
        }

        if (task.task_status_id) {            
            const findTaskStatusById = await prisma.taskStatus.count({ where: { id: task.task_status_id }});
            if (!findTaskStatusById) return "✖️ Status de tarefa informado não existe";            
        }

        if (task.user_id) {            
            const findUserById = await prisma.user.count({ where: { id: task.user_id }});
            if (!findUserById) return "✖️ Usuário informado não existe";            
        }

        return await prisma.task.create({
            data: {
                title: task.title,
                description: task.description,
                user_id: task.user_id,
                task_status_id: task.task_status_id,
            }
        })
    }

    async getTask(id: number): Promise<Task | null> {
        return await prisma.task.findFirst({ where: { id } });
    }

    async updateTask(id: number, title: string | null, description: string | null, user_id: number | null, task_status_id: number | null): Promise<Task | string> {

        const findById = await prisma.task.findFirst({
            where: {
                id
            }
        });

        if (!findById) return "✖️ Tarefa não encontrada para o ID informado!";

        if (task_status_id) {            
            const findTaskStatusById = await prisma.taskStatus.count({ where: { id: task_status_id }});
            if (!findTaskStatusById) return "✖️ Novo status de tarefa informado não existe";            
        }

        if (user_id) {            
            const findUserById = await prisma.user.count({ where: { id: user_id }});
            if (!findUserById) return "✖️ Usuário informado não existe";            
        }

        const payload = {
            title: title || findById.title,
            description: description || findById.description,
            user_id: user_id || findById.user_id,
            task_status_id: task_status_id || findById.task_status_id
        }

        return await prisma.task.update({
            where: {
                id,
            },
            data: payload            
        });
    }

    async deleteTask(id: number): Promise<Task | string> {

        const findById = await prisma.task.findFirst({
            where: {
                id
            }
        });

        if (!findById) return "✖️ Tarefa não encontrada para o ID informado!";

        return await prisma.task.delete({
            where: {
                id
            }
        });
    }
}

export default new TaskRepository();