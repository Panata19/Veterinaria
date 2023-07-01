import { Pipe, PipeTransform } from '@angular/core';
import ProductoData from '../producto/interfaces/ProductData';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(status: ProductoData): SafeHtml {
    let badge = ''
    let message = status.status;
    switch (true) {
      case status.quantitys > 10:
        badge = "badge-success";
        message = 'IN STOCK';
        break;
      case status.quantitys > 0 && status.quantitys <= 10:
        badge = "badge-warning";
        message = "LOW STOCK";
        break;
      case status.quantitys === 0:
        badge = "badge-danger";
        message = "OUT OF STOCK"
        break;
      default:
        badge = "badge-danger";
        message = "UNKNOWN"
        break;
    }
    
    const spanHtml = `<span class="badge ${badge} text-white">${message}</span>`;
    return this.sanitizer.bypassSecurityTrustHtml(spanHtml);
  }

}
