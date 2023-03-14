import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appInputValue]'
})
export class InputValueDirective {

  constructor(el:ElementRef) {
    el.nativeElement.style
   }

}
