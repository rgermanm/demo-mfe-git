import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterId'
})
export class FilterIdPipe implements PipeTransform {

  transform(menuAll:any[], parentId: string ):any [] {
            if(menuAll != undefined){
              return menuAll.filter(menu => menu.idMenuPadre == parentId);
            }else{
              return [];
            }
        


  }

}
