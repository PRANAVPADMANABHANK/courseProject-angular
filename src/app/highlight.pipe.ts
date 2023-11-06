import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {

  transform(value: string, cityCode: string): string {

    if (cityCode = "NY") {
      return 'The Apple City';
    } else {
      return 'The Garden City';
    }
  }
}
