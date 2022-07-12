import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNroOrden'
})
export class FilterNroOrdenPipe implements PipeTransform {

  transform(menuAll: any[], nroOrden: number ): any[] {
    if(menuAll != undefined){
      return menuAll.filter(menu => parseInt(menu.nroOrden) > nroOrden );
    }else{
       return [];
    } 

    
  }

}
