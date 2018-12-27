import { Component, OnInit } from '@angular/core';
import { SymbolService } from "../services/symbol.service";
import { SymbolController } from "../core/symbol-controller";
import { CatalogConfigService } from "../services/catalog-config.service";
import { FormBuilder, AbstractControl, Validators, ValidationErrors, ValidatorFn, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import * as jsPDF from 'jspdf'

import { RowItemCollection, SvgModelService, SVGConfig } from "../services/svg-model.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent extends SymbolController implements OnInit {

  private subscriptions: Subscription[] = []
  config: SVGConfig
  data: Uint8Array
  canSave: boolean = false

  formGroup: FormGroup
  styleGroup: FormGroup
  paddingsGroup: FormGroup

  constructor(
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
    let configSet: boolean = false
    const formatValidator = (): ValidatorFn => {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const v = control.value
        return (v == "a4" || v == "a3") ? null : { 'format invalide': { value: control.value } };
      }
    }
    const orientationValidator = (): ValidatorFn => {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const v = control.value
        return (v == "l" || v == "p") ? null : { 'orientation invalide': { value: control.value } };
      }
    }

    const colorValidator = (checkName: boolean = true): ValidatorFn => {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const v = control.value
        if (!v)
          return null

        if (checkName && cssColors.indexOf(v) > -1) {
          return null
        }
        let re = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i
        const b = re.test(v)
        return b ? null : { 'couleur invalide': { value: v } }
      }
    }

    const group = this.formBuilder.group(
      {
        format: ['format', [Validators.required, formatValidator()]],
        orientation: ['orientation', [Validators.required, orientationValidator()]],
        rowGap: ['rowGap', [Validators.required]],
        itemGap: ['itemGap', [Validators.required]],
        numRows: ['numRows', [Validators.required]],
        textPadding: ['textPadding', [Validators.required]],
        fontSize: ['fontSize', [Validators.required]],
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
}
const cssColors = [
  "none",
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen"
]