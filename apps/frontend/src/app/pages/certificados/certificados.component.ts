import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CertificatesService, Certificate, CertificateStats } from '../../shared/services/certificates.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { getTechIcon, getTechColor } from '../../shared/constants/tech-list';

export interface CategoryFilterItem {
  id: string;
  label: string;
  icon: string;
  count: number;
}

export interface CategoryDefinition {
  id: string;
  label: string;
  icon: string;
  match: (cert: Certificate) => boolean;
}

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
  availableCategories: CategoryFilterItem[] = [];
  stats?: CertificateStats;
  currentFilter: string = 'todos';
  selectedCertificate: Certificate | null = null;
  copiedId: boolean = false;
  isBrowser: boolean = false;
  isLoading: boolean = true;

  readonly categoryDefinitions: CategoryDefinition[] = [
    {
      id: 'web',
      label: 'Web & Frontend',
      icon: 'fas fa-code',
      match: (c) => c.category === 'web'
    },
    {
      id: 'backend',
      label: 'Backend & Arquitectura',
      icon: 'fas fa-server',
      match: (c) => c.category === 'backend'
    },
    {
      id: 'cloud',
      label: 'Cloud & DevOps',
      icon: 'fas fa-cloud',
      match: (c) => c.category === 'cloud'
    },
    {
      id: 'database',
      label: 'Bases de Datos',
      icon: 'fas fa-database',
      match: (c) => c.category === 'database'
    },
    {
      id: 'mobile',
      label: 'Móvil',
      icon: 'fas fa-mobile-alt',
      match: (c) => c.category === 'mobile'
    },
    {
      id: 'security',
      label: 'Redes & Seguridad',
      icon: 'fas fa-shield-alt',
      match: (c) => c.category === 'security' || c.category === 'network' || c.category === 'redes'
    },
    {
      id: 'support',
      label: 'Soporte & Help Desk',
      icon: 'fas fa-headset',
      match: (c) => c.category === 'support' || c.category === 'helpdesk'
    },
    {
      id: 'iot',
      label: 'IoT',
      icon: 'fas fa-microchip',
      match: (c) => c.category === 'iot'
    },
    {
      id: 'idiomas',
      label: 'Idiomas',
      icon: 'fas fa-language',
      match: (c) => c.category === 'idiomas' || c.category === 'languages' || c.category === 'ingles'
    }
  ];

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
        this.updateAvailableCategories();
        this.setFilter(this.currentFilter);
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

  updateAvailableCategories(): void {
    const list: CategoryFilterItem[] = [];

    for (const def of this.categoryDefinitions) {
      const count = this.certificates.filter(def.match).length;
      if (count > 0) {
        list.push({
          id: def.id,
          label: def.label,
          icon: def.icon,
          count
        });
      }
    }

    const matchedCategoryIds = new Set(this.categoryDefinitions.map((d) => d.id));
    this.certificates.forEach((cert) => {
      if (
        cert.category &&
        !this.categoryDefinitions.some((d) => d.match(cert)) &&
        !matchedCategoryIds.has(cert.category)
      ) {
        matchedCategoryIds.add(cert.category);
        const count = this.certificates.filter((c) => c.category === cert.category).length;
        if (count > 0) {
          list.push({
            id: cert.category,
            label: this.getCategoryLabel(cert.category),
            icon: this.getCategoryIcon(cert.category),
            count
          });
        }
      }
    });

    this.availableCategories = list;
    if (this.currentFilter !== 'todos' && !this.availableCategories.some((c) => c.id === this.currentFilter)) {
      this.currentFilter = 'todos';
    }
  }

  setFilter(filter: string): void {
    this.currentFilter = filter;
    if (filter === 'todos') {
      this.filteredCertificates = this.certificates;
    } else {
      const def = this.categoryDefinitions.find((d) => d.id === filter);
      if (def) {
        this.filteredCertificates = this.certificates.filter(def.match);
      } else {
        this.filteredCertificates = this.certificates.filter((c) => c.category === filter);
      }
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
        return 'Móvil';
      case 'security':
      case 'network':
      case 'redes':
        return 'Redes & Seguridad';
      case 'support':
      case 'helpdesk':
        return 'Soporte & Help Desk';
      case 'iot':
        return 'IoT';
      case 'idiomas':
      case 'languages':
      case 'ingles':
        return 'Idiomas';
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
      case 'security':
      case 'network':
      case 'redes':
        return 'fas fa-shield-alt';
      case 'support':
      case 'helpdesk':
        return 'fas fa-headset';
      case 'iot':
        return 'fas fa-microchip';
      case 'idiomas':
      case 'languages':
      case 'ingles':
        return 'fas fa-language';
      default:
        return 'fas fa-award';
    }
  }
}
