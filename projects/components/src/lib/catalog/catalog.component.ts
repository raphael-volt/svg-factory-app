import { Component, OnInit } from '@angular/core';

import { FormBuilder, AbstractControl, Validators, ValidationErrors, ValidatorFn, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";

import { SymbolService } from "../services/symbol.service";
import { SymbolListComponent } from "../symbol-list/symbol-list.component";
import { CatalogConfigService } from "../services/catalog-config.service";
import { TspdfService } from "tspdf";

import { RowItemCollection, SvgModelService, SVGConfig } from "../services/svg-model.service";
import { colorValidator, formatValidator, orientationValidator } from "common";
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent extends SymbolListComponent implements OnInit {

  private subscriptions: Subscription[] = []
  config: SVGConfig
  data: Uint8Array
  canSave: boolean = false

  formGroup: FormGroup
  styleGroup: FormGroup
  paddingsGroup: FormGroup

  currentFont: string
  constructor(
    private pdfService: TspdfService,
    private modelService: SvgModelService,
    symbolService: SymbolService,
    private formBuilder: FormBuilder,
    private configService: CatalogConfigService) {
    super(symbolService)
  }
  ngOnDestroy() {
    super.ngOnDestroy()
    for (const s of this.subscriptions) {
      s.unsubscribe()
    }
  }
  ngOnInit() {

    super.ngOnInit()

    this.setupFonts()
      .then(fonts => {
        this.setupForm()
      })
  }
  private setupForm() {
    let configSet: boolean = false
    

    const group = this.formBuilder.group(
      {
        format: ['format', [Validators.required, formatValidator()]],
        orientation: ['orientation', [Validators.required, orientationValidator()]],
        rowGap: ['rowGap', [Validators.required]],
        itemGap: ['itemGap', [Validators.required]],
        numRows: ['numRows', [Validators.required]],
        textPadding: ['textPadding', [Validators.required]],
        fontSize: ['fontSize', [Validators.required]],
        fontFamily: ['fontFamily', [Validators.required]],
        textColor: ['textColor', [Validators.required, colorValidator(false)]],
        style: this.formBuilder.group({
          stroke: ['stroke', [colorValidator()]],
          fill: ['fill', [colorValidator()]],
          strokeWidth: ['strokeWidth'],
        }),
        paddings: this.formBuilder.group({
          top: ['top', [Validators.required]],
          right: ['right', [Validators.required]],
          bottom: ['bottom', [Validators.required]],
          left: ['left', [Validators.required]],
        })
      }
    )
    this.formGroup = group
    this.paddingsGroup = group.get("paddings") as FormGroup
    this.styleGroup = group.controls.style as FormGroup

    let sub: Subscription = group.statusChanges.subscribe(status => {
      if (!configSet)
        return
      this.canSave = status == "VALID"
    })
    this.subscriptions.push(sub)

    sub = this.configService.getConfig().subscribe(
      config => {
        this.config = config
        configSet = true
        group.patchValue(config, { emitEvent: true, onlySelf: true });
        group.updateValueAndValidity()
        if (this.fontList.indexOf(config.fontFamily) != -1)
          this.currentFont = config.fontFamily
        this.canSave = group.valid
        this.createPages()
        sub = group.valueChanges.subscribe(event => {
          if (group.valid) {
            Object.assign(this.config, event)
            this.createPages()
          }
        })
        this.subscriptions.push(sub)
      }
    )
    this.subscriptions.push(sub)
  }

  getErrorMessage(control: AbstractControl) {
    if (!control.errors)
      return "no error"
    let messages = []
    for (let k in control.errors) {
      const e: ValidationErrors = control.errors[k]
      if (k == "required")
        k = "requis"
      if (e.value)
        messages.push(k + ":" + e.value)
      else
        messages.push(k)

    }
    return messages.join(" | ")
  }

  setSymbols(symbols) {
    super.setSymbols(symbols)
  }
  saveConfig() {
    this.configService.saveSubscribe()
  }
  collections: RowItemCollection[]
  download() {
    this.modelService.savePDF(this.collections, this.config)
  }
  downloadSVG() {
    this.modelService.saveSvg(this.collections[0].svgDesc.svg)
  }


  private createPages() {
    this.collections = this.modelService.createCollection(
      this.symbols, this.config
    )
  }

  fontList: string[] = []
  private setupFonts() {
    return new Promise((res, rej) => {
      const srv = this.pdfService
      if (srv.embededFontsLoaded) {
        this.fontList = srv.fontList
        res(this.fontList)
      }
      else {
        const s = srv.loadEmbededFonts().subscribe(
          fonts => {
            this.fontList = srv.fontList
            s.unsubscribe()
            res(this.fontList)
          }
        )
      }
    })
  }
}