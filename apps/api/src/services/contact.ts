import { ContactSchema } from "../infrastructure/validators/contact.ts";
import { ContactModel } from "../model/contact.ts";

interface ContactCreateData {
    name: string;
    email: string;
    subject?: string | null;
    message: string;
}

export class ContactsService {
    static async getContacts() {
        return ContactModel.findAll();
    }

    static async createContact(data: ContactCreateData) {
        const validated = ContactSchema.parse(data);
        return ContactModel.create(validated);
    }
}
