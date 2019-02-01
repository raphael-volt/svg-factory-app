import { Component, OnInit, Input } from '@angular/core';
import { SVGSymbol } from '../core/symbol';
import { MatDialogRef } from "@angular/material";
@Component({
  selector: 'path-editor',
  templateUrl: './path-editor.component.html',
  styleUrls: ['./path-editor.component.css']
})
export class PathEditorComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<PathEditorComponent>
  ) { }

  ngOnInit() {
  }
  @Input()
  public symbols: SVGSymbol[]

}
