import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { CorporateAboutComponent } from '../../components/corporate-about/corporate-about.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FeaturedServicesComponent } from '../../components/featured-services/featured-services.component';
import { FeaturedProjectsComponent } from '../../components/featured-projects/featured-projects.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ScrollRevealDirective,
    HeroComponent,
    CorporateAboutComponent,
    FeaturedServicesComponent,
    FeaturedProjectsComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.sass',
})
export class Home {

}
