import { Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { AppLanguage } from './app.language';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-floating-configurator',
  imports: [
    ButtonModule,
    StyleClassModule,
    AppConfigurator,
    AppLanguage,
    TranslatePipe,
  ],
  template: `
    <div class="fixed flex gap-4 top-6 right-6 z-50">
      <div class="relative">
        <p-button
          [rounded]="true"
          pStyleClass="@next"
          enterFromClass="hidden"
          enterActiveClass="animate-scalein"
          leaveToClass="hidden"
          leaveActiveClass="animate-fadeout"
          [hideOnOutsideClick]="true"
          severity="secondary"
        >
          <img
            [src]="getLangIcon(currentLang()?.currentLang || 'en')"
            alt="{{ currentLang()?.currentLang || 'en' | translate }} Lang"
            class="h-6 w-6 rounded-full"
          />
        </p-button>
        <app-language />
      </div>
      <p-button
        type="button"
        (onClick)="toggleDarkMode()"
        [rounded]="true"
        [icon]="isDarkTheme() ? 'pi pi-moon' : 'pi pi-sun'"
        severity="secondary"
      />
      <div class="relative">
        <p-button
          icon="pi pi-palette"
          pStyleClass="@next"
          enterFromClass="hidden"
          enterActiveClass="animate-scalein"
          leaveToClass="hidden"
          leaveActiveClass="animate-fadeout"
          [hideOnOutsideClick]="true"
          type="button"
          rounded
        />
        <app-configurator />
      </div>
    </div>
  `,
})
export class AppFloatingConfigurator {
  LayoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.LayoutService.layoutConfig().darkTheme);

  toggleDarkMode() {
    this.LayoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }

  private translateService = inject(TranslateService);
  readonly currentLang = toSignal(of(this.translateService));
  getLangIcon(lang: string): string {
    return `/icons/${lang}.png`;
  }
}
