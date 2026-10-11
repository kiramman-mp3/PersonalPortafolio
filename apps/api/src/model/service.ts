import prisma from "../infrastructure/repository/prisma.ts";

export class ServiceModel {
    static async findAll() {
        return await prisma.services.findMany();
    }
    static async findById(id: string) {
        return await prisma.services.findUnique({
            where: { id }
        });
    }
    static async create(data: {
        title: string;
        description: string;
        imageUrl: string;
        imageAlt: string;
        extendedInfo: string[];
        technologies?: string[];
    }) {
        return prisma.services.create({
            data
        });
    }
    static async update(id: string, data: {
        title?: string;
        description?: string;
        imageUrl?: string;
        imageAlt?: string;
        extendedInfo?: string[];
        technologies?: string[];
    }) {
        try {
            return prisma.services.update({
                where: { id },
                data
            });
        } catch {
            return null;
        }
    }
    static async delete(id: string) {
        try {
            return prisma.services.delete({
                where: { id }
            });
        } catch {
            return null;
        }
    }
}
