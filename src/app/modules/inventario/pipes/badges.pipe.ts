import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'badges'
})
export class BadgesPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(label: string): SafeHtml {

    let badge = ''
    switch (label) {
      case 'IN STOCK':
        badge = "text-bg-success";
        break;
      case "LOW STOCK":
        badge = "text-bg-warning";
        break;
      case "OUT OF STOCK":
        badge = "text-bg-danger";        
        break;
      default:
        badge = "text-bg-danger";
        break;
    }

    const spanHtml = `<span class="badge ${badge} text-white">${label}</span>`;
    return this.sanitizer.bypassSecurityTrustHtml(spanHtml);
  }

}
