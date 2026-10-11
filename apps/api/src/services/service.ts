import { ServiceSchema } from "../infrastructure/validators/service.ts";
import { ServiceModel } from "../model/service.ts";

interface ServiceCreateData {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    extendedInfo: string[];
    technologies?: string[];
}

interface ServiceEditData {
    title?: string;
    description?: string;
    imageUrl?: string;
    imageAlt?: string;
    extendedInfo?: string[];
    technologies?: string[];
}

export class ServicesService {
    static async getServices() {
        return ServiceModel.findAll();
    }

    static async getService(id: string) {
        const service = await ServiceModel.findById(id);
        if (!service) {
            throw new Error("Service not found");
        }
        return service;
    }

    static async createService(data: ServiceCreateData) {
        const validated = ServiceSchema.parse(data);
        return ServiceModel.create(validated);
    }

    static async updateService(id: string, newData: ServiceEditData) {
        const existing = await ServiceModel.findById(id);
        if (!existing) {
            throw new Error("Service not found");
        }
        const validated = ServiceSchema.partial().parse(newData);
        return ServiceModel.update(id, validated);
    }

    static async deleteService(id: string) {
        const existing = await ServiceModel.findById(id);
        if (!existing) {
            throw new Error("Service not found");
        }
        return ServiceModel.delete(id);
    }
}
