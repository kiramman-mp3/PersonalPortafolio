import prisma from "../infrastructure/repository/prisma.ts";

export class ProjectModel {
    static async findAll() {
        return await prisma.projects.findMany({
            orderBy: { id: 'asc' }
        });
    }
    static async findById(id: number) {
        return await prisma.projects.findUnique({
            where: { id }
        });
    }
    static async create(data: {
        title: string;
        description: string;
        technologies: string[];
        status: string;
        image: string;
        githubUrl: string;
    }) {
        return prisma.projects.create({
            data
        });
    }
    static async update(id: number, data: {
        title?: string;
        description?: string;
        technologies?: string[];
        status?: string;
        image?: string;
        githubUrl?: string;
    }) {
        try {
            return prisma.projects.update({
                where: { id },
                data
            });
        } catch {
            return null;
        }
    }
    static async delete(id: number) {
        try {
            return prisma.projects.delete({
                where: { id }
            });
        } catch {
            return null;
        }
    }
}
