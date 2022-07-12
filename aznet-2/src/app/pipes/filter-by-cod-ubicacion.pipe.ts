import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCodUbicacion'
})
export class FilterByCodUbicacionPipe implements PipeTransform {

  transform(menuAll: any[], codUbicacion: string /* , checkDataReady: boolean */ ): any[] {
     if(menuAll != undefined){
      return menuAll.filter(menu => menu.codUbicacion == codUbicacion);
     }else {
       return [];
     } 
    
  }

}
