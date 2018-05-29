import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appMotivesHtml'
})
export class MotivesHtmlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let htmlString = '';
    if (!value) {
      return htmlString;
    }
    const defaultColors = {h: 'blue', b: 'green', u: 'red'};
    const colors = value.split('_');
    let i = 1;

    colors.forEach((color: string) => {
      const colorLower = color.toLowerCase();
      if (colorLower === 'hub') {
        // each letter in hub has a different color so we need to
        // treat this color differently
        const letters = color.split('');
        letters.forEach((letter: string) => {
          htmlString += `<span class="color ${defaultColors[letter.toLowerCase()]}">${letter}</span>`;
        });
      } else {
        htmlString += `<span class="color text-uppercase ${colorLower}">${color}</span>`;
        if (colors.length > 1 && i !== colors.length) {
          htmlString += '-';
        }
      }

      i += 1;
    });

    return htmlString;
  }

}
