import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'es', 'fr', 'ru']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
