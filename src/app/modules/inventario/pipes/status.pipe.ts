import { Pipe, PipeTransform } from '@angular/core';
import ProductoData from '../producto/interfaces/ProductData';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(Product: ProductoData): SafeHtml {
    let badge = ''
    switch (true) {
      case Product.quantitys > 10:
        badge = "badge-success";
        break;
      case Product.quantitys > 0 && Product.quantitys <= 10:
        badge = "badge-warning";
        break;
      case Product.quantitys === 0:
        badge = "badge-danger";        
        break;
      default:
        badge = "badge-danger";
        break;
    }
      
    const spanHtml = `<span class="badge ${badge} text-white">${Product.status}</span>`;
    return this.sanitizer.bypassSecurityTrustHtml(spanHtml);
  }

}
