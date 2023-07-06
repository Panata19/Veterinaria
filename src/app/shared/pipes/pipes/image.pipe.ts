import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(urlImage: string): string {
    let checkImage = urlImage.endsWith(".png") || urlImage.endsWith(".jpg") || urlImage.endsWith(".svg");
    let image : string;
    if(checkImage){
      image = urlImage;
    } else {
      image = '../assets/img/Artboard.svg';
    }
    return image;
  }

}
