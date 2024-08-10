import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usdtoegp',
  standalone: true
})
export class UsdtoegpPipe implements PipeTransform {

 
  transform(value:number, rate:number=50):number{
    return value*rate;
  }


}
