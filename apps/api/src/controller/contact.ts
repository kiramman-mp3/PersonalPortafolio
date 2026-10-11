import { Request, Response } from "express";
import { ContactsService } from "../services/contact.ts";

export class ContactController {
    static async getAll(req: Request, res: Response) {
        try {
            const contacts = await ContactsService.getContacts();
            res.status(200).json(contacts);
        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch contact messages",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const contact = await ContactsService.createContact(req.body);
            res.status(201).json(contact);
        } catch (error) {
            res.status(400).json({
                message: "Failed to save contact message",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
}
