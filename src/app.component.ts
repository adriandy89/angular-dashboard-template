import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, TranslateModule, ToastModule],
  template: `
    <p-toast />
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'es', 'fr', 'ru']);
    const lang = localStorage.getItem('lang') || 'en';
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }
}
