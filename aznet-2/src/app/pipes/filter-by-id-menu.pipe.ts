import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByIdMenu'
})
export class FilterByIdMenuPipe implements PipeTransform {

  transform(menuAll:any[], IdMenu: string ):any [] {
    if(menuAll != undefined){
      return menuAll.filter(menu => menu.idMenu == IdMenu);
    }else{
      return [];
    }



}

}
