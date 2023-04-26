import { Request, Response } from "express";
import TaskService from "../services/TaskService";
import { Task } from "@prisma/client";
import sharp from "sharp";


class TaskController {

    static async index(req: Request, res: Response) {
        try {
            const tasks = await TaskService.getTasks();

            return res.json({
                success: true,
                result: tasks
            });
            
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, deu ruim!" });
        }
    }

    static async create(req: Request, res: Response) {

        try {

            const { title, description, user_id, task_status_id } = req.body;

            if (!title || !description || !user_id || !task_status_id) {
                return res
                    .status(500)
                    .json({ success: false, message: "✖️ Você precisa informar todos os campos necessários para criação de uma tarefa" });
            }

            const task: Task | string = await TaskService.createTask({
                title,
                description,
                user_id,
                task_status_id
            } as Task);

            if (typeof task === 'string') return res.status(500).json({
                success: false,
                message: task
            });

            return res.json({
                success: true,
                message: "Tarefa criada com sucesso!",
                result: task
            });

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, deu ruim!" });
        }

    }

    static async show(req: Request, res: Response) {
        try {

            const { id } = req.params;

            const checkTaskId = TaskController.checkTaskId(id);
            if (!checkTaskId?.success) return res.status(500).json(checkTaskId);

            const task = await TaskService.getTask(Number(id));

            if (!task) return res
                .status(404)
                .json({ success: false, message: "✖️ Tarefa não encontrada para o ID informado!" });

            return res.json({
                success: true,
                result: task
            });

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, deu ruim!" });
        }
    }

    static async update(req: Request, res: Response) {

        try {
            const { id } = req.params;

            const checkTaskId = TaskController.checkTaskId(id);
            if (!checkTaskId?.success) return res.status(500).json(checkTaskId?.message);

            const { title, description, user_id, task_status_id } = req.body;

            if (!title && !description && !user_id && !task_status_id) return res
                .status(500)
                .json({ success: false, message: "✖️ Você precisa informar pelo menos um campo para ser atualizado na tarefa" });

            const task: Task | string = await TaskService.updateTask(Number(id), title, description, user_id, task_status_id);

            if (typeof task === 'string') return res
                .status(404)
                .json({ success: false, message: task });

            return res.json({
                success: true,
                message: "Tarefa atualizada com sucesso!",
                result: task
            });

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, deu ruim!" });
        }

    }

    static async delete(req: Request, res: Response) {

        try {

            const { id } = req.params;

            const checkTaskId = TaskController.checkTaskId(id);
            if (!checkTaskId?.success) return res.status(500).json(checkTaskId);

            const task = await TaskService.deleteTask(Number(id));

            if (typeof task === 'string') return res
                .status(404)
                .json({ success: false, message: task });

            return res.json({
                success: true,
                message: "✅ Tarefa apagada com sucesso!"
            });

        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "✖️ Ops, deu ruim!" });
        }

    }

    static async sendFile(req: Request, res: Response){

        if (!req.file) return res.status(500).json({ message: "É obrigatório o envio de uma imagem "});

        await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toFile(`./uploads/${req.file.originalname}`)

        return res.json({ message: "Arquivo enviado com sucesso"});
        // para acrescentar a imagem na pasta uploads exemplo
        // await prisma.user.update({
        //     where: {
        //         id: req.body.id
        //     },
        //     data: {
        //         profile_pic: req.file.originalname
        //     }
        // })

    }

    static checkTaskId(id: string) {

        if (!id) return { success: false, message: "✖️ É obrigatório informar o ID da tarefa!" };
        if (isNaN(Number(id))) return { success: false, message: "✖️ O ID precisa ser um número!" };

        return { success: true };

    }

}

export default TaskController

