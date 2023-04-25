import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterData'
})
export class FilterDataPipe implements PipeTransform {
  transform(value: any[], dataFiltru: string): any[] {
    if (value) {
      const today = new Date();
      return value.filter((item) => new Date(item.data) >= today);
    }
    return value;
  }
}
