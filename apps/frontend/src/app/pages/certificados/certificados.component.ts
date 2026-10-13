import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CertificatesService, Certificate, CertificateStats } from '../../shared/services/certificates.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { getTechIcon, getTechColor } from '../../shared/constants/tech-list';

@Component({
  selector: 'app-certificados-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './certificados.component.html',
  styleUrl: './certificados.component.scss'
})
export class CertificadosComponent implements OnInit {
  certificates: Certificate[] = [];
  filteredCertificates: Certificate[] = [];
  stats?: CertificateStats;
  currentFilter: string = 'todos';
  selectedCertificate: Certificate | null = null;
  copiedId: boolean = false;
  isBrowser: boolean = false;
  isLoading: boolean = true;

  constructor(
    private certificatesService: CertificatesService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.certificatesService.getCertificates().subscribe({
      next: (data) => {
        this.certificates = data;
        this.filteredCertificates = data;
        this.isLoading = false;
        this.certificatesService.getStats(data).subscribe((statsData) => {
          this.stats = statsData;
          this.cdr.detectChanges();
        });
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  setFilter(filter: string): void {
    this.currentFilter = filter;
    if (filter === 'todos') {
      this.filteredCertificates = this.certificates;
    } else {
      this.filteredCertificates = this.certificates.filter(
        (c) => c.category === filter
      );
    }
    this.cdr.detectChanges();
  }

  openCertificateModal(cert: Certificate): void {
    this.selectedCertificate = cert;
    this.copiedId = false;
    this.cdr.detectChanges();
  }

  closeModal(): void {
    this.selectedCertificate = null;
    this.copiedId = false;
    this.cdr.detectChanges();
  }

  copyCredentialId(id: string): void {
    if (this.isBrowser && navigator.clipboard) {
      navigator.clipboard.writeText(id).then(() => {
        this.copiedId = true;
        setTimeout(() => {
          this.copiedId = false;
          this.cdr.detectChanges();
        }, 2200);
        this.cdr.detectChanges();
      });
    }
  }

  getTechIcon(tech: string): string {
    return getTechIcon(tech);
  }

  getTechColor(tech: string): string {
    return getTechColor(tech);
  }

  getCategoryLabel(category: string): string {
    switch (category) {
      case 'web':
        return 'Web & Frontend';
      case 'backend':
        return 'Backend & Arquitectura';
      case 'cloud':
        return 'Cloud & DevOps';
      case 'database':
        return 'Bases de Datos';
      case 'mobile':
        return 'Móvil & Otros';
      default:
        return 'General';
    }
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'web':
        return 'fas fa-code';
      case 'backend':
        return 'fas fa-server';
      case 'cloud':
        return 'fas fa-cloud';
      case 'database':
        return 'fas fa-database';
      case 'mobile':
        return 'fas fa-mobile-alt';
      default:
        return 'fas fa-award';
    }
  }
}
