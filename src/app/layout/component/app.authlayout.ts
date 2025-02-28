import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AppBgAnimation } from '../../layout/component/app.bg-animation';
import { AuthStore } from '../../pages/auth/store/auth.store';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    RouterModule,
    AppFloatingConfigurator,
    AppBgAnimation,
  ],
  template: `
    <app-floating-configurator />
    <app-bg-animation></app-bg-animation>
    <div
      class="bg-opacity-30 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden"
    >
      <div class="flex flex-col items-center justify-center opacity-90">
        <div
          style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)"
        >
        <router-outlet></router-outlet>

        </div>
      </div>
    </div>
  `,
  providers: [AuthStore],
})
export class AuthLayout {

}
