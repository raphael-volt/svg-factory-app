import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'button[autoRepeat]'
})
export class AutoRepeatDirective {

  private target: HTMLButtonElement

  private intervalId: number | any = NaN
  private timeoutId: number | any = NaN
  
  @HostListener("mousedown", ["$event"])
  mouseDown = (event: MouseEvent) => {
    this.mouseUp(event)
    this.timeoutId = setTimeout(() => {
      this.timeoutId = NaN
      this.intervalId = setInterval(
        handler => {
          this.target.click()
        },
        100
      )
    }, 300)
  }
  @HostListener("mouseup", ["$event"])
  mouseUp = (event: MouseEvent) => {
    if(! isNaN(this.timeoutId)) {
      clearTimeout(this.timeoutId)
      this.timeoutId = NaN
    }
    if (!isNaN(this.intervalId)) {
      clearInterval(this.intervalId)
      this.intervalId = NaN
    }
  }
  @HostListener("mouseleave", ["$event"])
  mouseLeave = (event: MouseEvent) => {
    this.mouseUp(event)
  }
  @HostListener("mouseout", ["$event"])
  mouseOut = (event: MouseEvent) => {
    this.mouseUp(event)
  }

  constructor(ref: ElementRef) {
    this.target = ref.nativeElement
  }

}
