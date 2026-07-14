import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServicesService, ServiceItem } from '../../shared/services/services.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';
import { getTechIcon, getTechColor } from '../../shared/constants/tech-list';

@Component({
  selector: 'app-servicios-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, MarkdownPipe],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.scss'
})
export class ServiciosComponent implements OnInit {
  services: ServiceItem[] = [];
  isBrowser = false;

  constructor(
    private servicesService: ServicesService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.servicesService.getServices().subscribe(data => {
        this.services = data;
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

  getServiceIcon(id: string): string {
    const icons: { [key: string]: string } = {
      'web-dev': 'fa-code',
      'ui-ux': 'fa-palette',
      'ai-solutions': 'fa-brain'
    };
    return icons[id] || 'fa-star';
  }
}
