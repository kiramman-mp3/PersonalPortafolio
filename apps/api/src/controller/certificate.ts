import type { Request, Response } from "express";
import { CertificatesService } from "../services/certificate.ts";
import { ZodError } from "zod";

export class CertificateController {
  static async getAll(req: Request, res: Response) {
    try {
      const certificates = await CertificatesService.getCertificates();
      res.status(200).json(certificates);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch certificates",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }

  static async getOne(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      if (!id) {
        return res.status(400).json({ message: "Invalid certificate ID" });
      }
      const certificate = await CertificatesService.getCertificate(id);
      res.status(200).json(certificate);
    } catch (error) {
      res.status(404).json({
        message: error instanceof Error ? error.message : "Certificate not found"
      });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const certificate = await CertificatesService.createCertificate(req.body);
      res.status(201).json(certificate);
    } catch (error) {
      console.error("Error creating certificate:", error);
      const msg = error instanceof ZodError 
        ? error.issues.map(i => i.message).join(", ") 
        : (error instanceof Error ? error.message : "Error desconocido");
      res.status(400).json({
        message: msg,
        error: msg
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      if (!id) {
        return res.status(400).json({ message: "Invalid certificate ID" });
      }
      const certificate = await CertificatesService.updateCertificate(id, req.body);
      res.status(200).json(certificate);
    } catch (error) {
      console.error("Error updating certificate:", error);
      const msg = error instanceof ZodError 
        ? error.issues.map(i => i.message).join(", ") 
        : (error instanceof Error ? error.message : "Error desconocido");
      res.status(400).json({
        message: msg,
        error: msg
      });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      if (!id) {
        return res.status(400).json({ message: "Invalid certificate ID" });
      }
      await CertificatesService.deleteCertificate(id);
      res.status(200).json({ message: "Certificate deleted successfully" });
    } catch (error) {
      res.status(404).json({
        message: error instanceof Error ? error.message : "Certificate not found"
      });
    }
  }
}
