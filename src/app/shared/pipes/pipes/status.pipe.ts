import { Pipe, PipeTransform } from '@angular/core';
import { ProductoData } from './ProductData';
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
        badge = "text-bg-success";
        break;
      case Product.quantitys > 0 && Product.quantitys <= 10:
        badge = "text-bg-warning";
        break;
      case Product.quantitys === 0:
        badge = "text-bg-danger";        
        break;
      default:
        badge = "text-bg-danger";
        break;
    }
    
    const spanHtml = `<span class="badge ${badge} text-white">${Product.status}</span>`;
    return this.sanitizer.bypassSecurityTrustHtml(spanHtml);
  }

}
