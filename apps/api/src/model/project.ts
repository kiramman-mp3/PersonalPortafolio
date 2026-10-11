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
        shortDescription: string;
        description: string;
        technologies: string[];
        status: string;
        image: string;
        githubUrl?: string | null;
        webUrl?: string | null;
        backendUrl?: string | null;
        apkUrl?: string | null;
    }) {
        return prisma.projects.create({
            data: data as any
        });
    }
    static async update(id: number, data: {
        title?: string;
        shortDescription?: string;
        description?: string;
        technologies?: string[];
        status?: string;
        image?: string;
        githubUrl?: string | null;
        webUrl?: string | null;
        backendUrl?: string | null;
        apkUrl?: string | null;
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
