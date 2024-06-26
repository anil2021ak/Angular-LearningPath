import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skillCardSearch',
  standalone: true
})
export class SkillCardSearchPipe implements PipeTransform {

  transform(data: any, searchText: any):Array<any> {
    return data.filter((t:any)=> t.created_by.toLowerCase().indexOf(searchText.toLowerCase())> -1)
  }

}
