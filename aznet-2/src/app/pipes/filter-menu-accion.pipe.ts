import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterMenuAccion"
})
export class FilterMenuAccionPipe implements PipeTransform {
  transform(menuAll: any[], codUbicacion?: string): any[] {
    return menuAll.filter(menu => menu.menuAccion);
  }
}
