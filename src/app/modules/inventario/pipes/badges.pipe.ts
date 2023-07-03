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
        badge = "badge-success";
        break;
      case "LOW STOCK":
        badge = "badge-warning";
        break;
      case "OUT OF STOCK":
        badge = "badge-danger";        
        break;
      default:
        badge = "badge-danger";
        break;
    }

    const spanHtml = `<span class="badge ${badge} text-white">${label}</span>`;
    return this.sanitizer.bypassSecurityTrustHtml(spanHtml);
  }

}
