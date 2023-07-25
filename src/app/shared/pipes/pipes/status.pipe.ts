import { Pipe, PipeTransform } from '@angular/core';
import { StockType } from './StockType';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(Product: StockType): SafeHtml {
    let badge = ''
    switch (true) {
      case Product.quantitys > 10:
        badge = "text-bg-success";
        break;
      case Product.quantitys > 0 && Product.quantitys <= 10:
        badge = "text-bg-warning text-black";
        break;
      case Product.quantitys === 0:
        badge = "text-bg-danger";        
        break;
      default:
        badge = "text-bg-danger";
        break;
    }
    
    const spanHtml = `<span class="badge ${badge} ">${Product.stock}</span>`;
    return this.sanitizer.bypassSecurityTrustHtml(spanHtml);
  }

}
