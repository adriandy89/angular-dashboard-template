import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { LayoutService } from '../service/layout.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CountryService } from '../../services/country.service';
import { NodeService } from '../../services/node.service';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="flex flex-col gap-4">
      @for (lang of langs; track lang) {
      <button
        type="button"
        (click)="setLang(lang)"
        class="border-none w-full h-5 rounded-full p-0 cursor-pointer outline-none outline-offset-1"
      >
        <div class="flex items-center">
          <img
            [src]="getIcon(lang)"
            alt="{{ lang | translate }} Lang"
            class="inline-block h-5 w-5 mr-2"
          />
          <div>{{ lang | translate }}</div>
        </div>
      </button>
      }
    </div>
  `,
  host: {
    class:
      'hidden absolute top-[3.25rem] right-0 w-40 p-4 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]',
  },
  providers: [CountryService, NodeService],
})
export class AppLanguage {
  router = inject(Router);

  config: PrimeNG = inject(PrimeNG);

  layoutService: LayoutService = inject(LayoutService);

  primeng = inject(PrimeNG);

  private translateService = inject(TranslateService);
  private currentLang = signal<string>(
    this.translateService.currentLang || 'en'
  );
  readonly langs = ['en', 'es', 'fr', 'ru'];

  selectedLang = computed(() => this.currentLang());

  setLang(lang: string) {
    localStorage.setItem('lang', lang);
    this.currentLang.set(lang);
    this.translateService.use(lang);
  }

  getIcon(lang: string): string {
    return `/icons/${lang}.png`;
  }
}
