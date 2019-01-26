import {
  Component, Directive, OnInit, ViewChild, Input,
  AfterViewInit, Output, EventEmitter,
  ElementRef,
  OnChanges,
  SimpleChanges,
  DoCheck,
  OnDestroy
} from '@angular/core';
import { Subscription } from "rxjs";
import { FormControl, AbstractControl } from '@angular/forms';
import { SVGSymbol } from "../core/symbol";
import { MatStepper, MatStep } from "@angular/material";
import {
  PrintableSymbol, PrintableSymbolConfig, symbolsSizesProvider, numCopiesProvider
} from "../svg-display/svg-display";
import { SvgDisplayService } from "../svg-display/svg-display.service";
import { DepthDiffer, DepthDifferService } from "change-detection";
import { callLater } from "../core/call-later";

interface StepperEvent {
  previouslySelectedIndex: number
  previouslySelectedStep: MatStep
  selectedIndex: number
  selectedStep: MatStep
}
@Component({
  selector: 'print-symbols',
  templateUrl: './print-symbols.component.html',
  styleUrls: ['./print-symbols.component.scss']
})
export class PrintSymbolsComponent implements OnDestroy, OnInit, AfterViewInit, DoCheck {

  selectionCtrl: AbstractControl
  selectedSymbols: SVGSymbol[] = []
  configItems: PrintableSymbol[] = []
  hasSelection: boolean = false

  private printablesDiffer: DepthDiffer<PrintableSymbol[]>
  private printablesSubscription: Subscription

  private pageDiffer: DepthDiffer<any>
  private pageSubscription: Subscription

  constructor(
    private displayService: SvgDisplayService,
    differs: DepthDifferService
  ) {
    this.printablesDiffer = differs.create(this.configItems)
    this.printablesSubscription = this.printablesDiffer.events.subscribe(this.changeHandler)
    this.pageDiffer = differs.create({
      page:displayService.page,
      style: displayService.styles
    })
    this.pageSubscription = this.pageDiffer.events.subscribe(this.changeHandler)
  }

  private changeHandler = event => {
    this.displayService.validate(this.configItems)
  }

  ngDoCheck() {
    this.printablesDiffer.doCheck()
    this.pageDiffer.doCheck()
  }
  ngOnDestroy() {
    this.printablesSubscription.unsubscribe()
    this.pageSubscription.unsubscribe()
  }

  @ViewChild(MatStepper)
  stepper: MatStepper

  ngOnInit() {
    this.selectionCtrl = new FormControl(null, (ctrl: AbstractControl) => {
      if (this.selectedSymbols && this.selectedSymbols.length)
        return null
      return { error: true }
    })
  }
  private initConfig = {
    selection: [],
    viewInit: false,
    viewChecked: false
  }

  ngAfterViewInit() {
    this.initConfig.viewInit = true

    if (!this.initConfig.viewChecked) {
      callLater(() => {
        this.initConfig.viewChecked = true
        this.selectionChanged(this.initConfig.selection)
        this.checkConfigItems()
        setTimeout(() => {
          this.stepper.next()
        }, 1000)
      })
    }
  }
  // debug only
  symbolsChange(symbols: SVGSymbol[]) {
    this.initConfig.selection = symbols.slice(0, 20)
  }
  private _selectionChangedFlag: boolean = false
  selectionChanged(items: SVGSymbol[]) {
    this.hasSelection = items.length > 0
    this.selectedSymbols = items
    this._selectionChangedFlag = true

  }
  stepperSelectionChange(event: StepperEvent) {
    if (event.previouslySelectedIndex == 0) {
      if (this._selectionChangedFlag) {
        this.checkConfigItems()
        this._selectionChangedFlag = false
      }
    }
  }
  private checkConfigItems() {
    const removed: PrintableSymbol[] = []
    const selected = this.selectedSymbols
    let items = this.configItems

    let symbols = this.selectedSymbols.filter(s => {
      for (const pc of items) {
        if (pc.symbol == s)
          return false
      }
      return true
    })
    for (const pc of items) {
      if (selected.indexOf(pc.symbol) < 0) {
        removed.push(pc)
      }
    }
    while (removed.length) {
      const i = items.indexOf(removed.shift())
      items.splice(i, 1)
    }
    for (const s of symbols) {
      items.push(new PrintableSymbol(s))
    }
  }
  reset() {
    this.selectedSymbols = []
    this.hasSelection = false
    this.stepper.reset()
  }
  configRemoved(config: PrintableSymbol) {
    this.configItems.splice(this.configItems.indexOf(config), 1)
    for (let i = 0; i < this.selectedSymbols.length; i++) {
      const s = this.selectedSymbols[i]
      if (s == config.symbol) {
        this.selectedSymbols.splice(i, 1)
        break;
      }
    }
    if (!this.configItems.length) {
      this.stepper.selectedIndex = 0
      this.hasSelection = false
    }
  }

}

@Component({
  selector: 'config-controller',
  templateUrl: './config-controller.component.html',
  styleUrls: ['./config-controller.component.scss']
})
export class ConfigControllerComponent implements AfterViewInit {
  constructor(public service: SvgDisplayService) { }
  @Output()
  configRemoved: EventEmitter<PrintableSymbol> = new EventEmitter()
  sizesProvider = symbolsSizesProvider
  copiesProvider = numCopiesProvider
  viewInitialized = false
  @Input()
  items: PrintableSymbol[]
  addEditor(ps: PrintableSymbol) {
    ps.configs.push(new PrintableSymbolConfig())
  }
  removeEditor(ps: PrintableSymbol, psc: PrintableSymbolConfig) {
    const i = ps.configs.indexOf(psc)
    ps.configs.splice(i, 1)
  }
  removeConfig(config) {
    this.configRemoved.next(config)
  }
  log(d) {
    console.log(d)
  }
  ngAfterViewInit() {
    callLater(() => {
      this.viewInitialized = true
    })
  }
  pageChange(page:any) {
    
  }
}

class ViewInitializable implements AfterViewInit {
  private _initialized: boolean
  protected get viewInitialized(): boolean {
    return this._initialized
  }

  ngAfterViewInit() {
    this._initialized = true
    this.invalidateViewInit()
  }
  protected invalidateViewInit() {

  }
}

@Directive({
  selector: '[onClassLater]'
})
export class OnClassLaterDirective extends ViewInitializable implements OnChanges {
  @Input()
  onClassLater: any
  constructor(private ref: ElementRef) {
    super()
  }
  protected invalidateViewInit() {
    if (this.onClassLater !== undefined)
      this.addClass()
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.onClass && changes.onClass.currentValue !== undefined) {
      if (this.viewInitialized) {
        this.addClass()
      }
    }
  }

  private addClass() {
    const e: HTMLElement = this.ref.nativeElement
    if (e.classList.contains("on"))
      return
    callLater(() => {
      e.classList.add("on")
    })
  }
}