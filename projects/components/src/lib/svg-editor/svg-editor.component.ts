import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { SVGSymbol } from "../core/symbol";
import { SvgEditorService } from "./svg-editor.service";
@Component({
  selector: 'svg-editor',
  templateUrl: './svg-editor.component.html',
  styleUrls: ['./svg-editor.component.css']
})
export class SvgEditorComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<SvgEditorComponent>,
    private editor: SvgEditorService
  ) { }

  symbols: SVGSymbol[]

  current: SVGSymbol

  ngOnInit() {
    if(this.symbols && this.symbols.length) {
      this.current = this.symbols[0]
    }
  }

  next() {

  }
  cancel() {
    this.dialogRef.close()
  }

}
