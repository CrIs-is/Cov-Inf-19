import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findDep'
})
export class FindDepPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
