import prisma from "../infrastructure/repository/prisma.ts";

export class CertificateModel {
  static async findAll() {
    return await prisma.certificates.findMany({
      orderBy: { createdAt: "desc" }
    });
  }

  static async findById(id: string) {
    return await prisma.certificates.findUnique({
      where: { id }
    });
  }

  static async create(data: {
    title: string;
    issuer: string;
    issuerIcon?: string;
    date: string;
    category: string;
    credentialId: string;
    credentialUrl?: string | null;
    description: string;
    skills: string[];
    hours?: number;
    image?: string | null;
    expirationDate?: string | null;
    badgeStatus?: string | null;
  }) {
    return await prisma.certificates.create({
      data: data as any
    });
  }

  static async update(id: string, data: any) {
    try {
      return await prisma.certificates.update({
        where: { id },
        data
      });
    } catch {
      return null;
    }
  }

  static async delete(id: string) {
    try {
      return await prisma.certificates.delete({
        where: { id }
      });
    } catch {
      return null;
    }
  }
}
