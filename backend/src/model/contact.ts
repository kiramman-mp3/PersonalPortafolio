import prisma from "../infrastructure/repository/prisma.ts";

export class ContactModel {
    static async findAll() {
        return await prisma.contacts.findMany({
            orderBy: { createdAt: "desc" }
        });
    }

    static async create(data: {
        name: string;
        email: string;
        subject?: string | null;
        message: string;
    }) {
        return prisma.contacts.create({
            data
        });
    }
}
