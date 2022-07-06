import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workspace'
})
export class WorkspacePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
