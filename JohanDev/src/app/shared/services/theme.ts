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

        if (isDark) {
          document.body.classList.remove('light-theme');
          document.documentElement.classList.remove('light-theme');
        } else {
          document.body.classList.add('light-theme');
          document.documentElement.classList.add('light-theme');
        }
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
