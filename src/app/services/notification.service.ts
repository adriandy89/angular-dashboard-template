import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private messageService: MessageService, private translate: TranslateService) { }

  show(
    { type, summaryKey, messageKey, duration }:
      { type: 'info' | 'warn' | 'error' | 'success', summaryKey: string, messageKey: string, duration?: number }) {
    const summary = this.translate.instant(summaryKey);
    const detail = this.translate.instant(messageKey);
    this.messageService.add({
      severity: type,
      summary,
      detail,
      life: duration || 3000,
    });
  }
}
