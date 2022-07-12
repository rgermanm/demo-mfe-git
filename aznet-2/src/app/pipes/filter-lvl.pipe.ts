import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterLvl'
})
export class FilterLvlPipe implements PipeTransform {

  transform(menuAll: any[], level:string ): any[] {

     return menuAll.filter(menu => menu.nroNivel == level);

  }

}
