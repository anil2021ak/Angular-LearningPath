import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(data: any, searchText:any): Array<any> {
    return data.filter((t:any) => t.employee_name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
}
}