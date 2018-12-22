import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { SVGSymbol } from "../core/symbol";
import { SvgEditorService } from "./svg-editor.service";
import { SymbolService } from "../services/symbol.service";
@Component({
  selector: 'svg-editor',
  templateUrl: './svg-editor.component.html',
  styleUrls: ['./svg-editor.component.css']
})
export class SvgEditorComponent implements OnInit, OnChanges {

  constructor(
    private dialogRef: MatDialogRef<SvgEditorComponent>,
    private editor: SvgEditorService,
    private symbolService: SymbolService
  ) { }
  @Input()
  symbols: SVGSymbol[]

  current: SVGSymbol

  private currentIndex: number
  private clones: SVGSymbol[]
  ngOnInit() {
    if(this.symbols)
      this.init()
  }

  ngOnChanges(changes) {
    if (changes.symbols)
      this.init()
  }

  private init() {
    this.currentIndex = 0
    this.clones = []
    if (this.symbols && this.symbols.length) {
      this.next()
    }
  }

  next() {
    if (this.currentIndex < this.symbols.length) {
      this.current = this.clone(this.symbols[this.currentIndex++])
      this.clones.push(this.current)
    }

    else {
      this.save()
    }
  }

  cancel() {
    this.dialogRef.close()
  }

  rotate(value: number) {
    this.editor.rotate(this.current, value)
  }

  private clone(src: SVGSymbol): SVGSymbol {
    return {
      id: src.id,
      data: src.data,
      width: src.width,
      height: src.height
    }
  }

  private updateTargets() {
    for (let i = 0; i < this.symbols.length; i++) {
      const element: SVGSymbol = this.symbols[i];
      const clone: SVGSymbol = this.clones[i];
      element.data = clone.data
      element.width = clone.width
      element.height = clone.height
    }
    this.clones = null
    this.symbols = null
    this.current = null
    this.cancel()
  }

  private save() {
    const items: SVGSymbol[] = this.clones.slice()
    const nextSave = () => {
      if (items.length) {
        const item = items.shift()
        const sub = this.symbolService.update(item).subscribe(
          success => {
            sub.unsubscribe()
            nextSave()
          },
          error => {
            sub.unsubscribe()
            alert("L'enregistrement a échoué.")
          }
        )
      }
      else {
        this.updateTargets()
      }
    }
    nextSave()
  }
}
