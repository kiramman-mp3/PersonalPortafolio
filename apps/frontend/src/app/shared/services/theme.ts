import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal<boolean>(true);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    this.initTheme();

    effect(() => {
      const isDark = this.isDarkMode();
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        document.documentElement.classList.toggle('light-theme', !isDark);
      }
    });
  }

  private initTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDarkMode.set(savedTheme === 'dark');
      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode.set(prefersDark);
      }
    }
  }

  toggleTheme(): void {
    this.isDarkMode.update(dark => !dark);
  }
}
