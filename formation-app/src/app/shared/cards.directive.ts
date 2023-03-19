import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appCards]'
})
export class CardsDirective {

  constructor(el:ElementRef) {
    el.nativeElement.style.display='none';
   }

}
