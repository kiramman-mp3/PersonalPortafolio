import { CertificateSchema } from "../infrastructure/validators/certificate.ts";
import { CertificateModel } from "../model/certificate.ts";

export class CertificatesService {
  static async getCertificates() {
    return CertificateModel.findAll();
  }

  static async getCertificate(id: string) {
    const cert = await CertificateModel.findById(id);
    if (!cert) {
      throw new Error("Certificate not found");
    }
    return cert;
  }

  static async createCertificate(data: any) {
    const validated = CertificateSchema.parse(data);
    return CertificateModel.create(validated);
  }

  static async updateCertificate(id: string, newData: any) {
    const existing = await CertificateModel.findById(id);
    if (!existing) {
      throw new Error("Certificate not found");
    }
    const validated = CertificateSchema.partial().parse(newData);
    return CertificateModel.update(id, validated);
  }

  static async deleteCertificate(id: string) {
    const existing = await CertificateModel.findById(id);
    if (!existing) {
      throw new Error("Certificate not found");
    }
    return CertificateModel.delete(id);
  }
}
