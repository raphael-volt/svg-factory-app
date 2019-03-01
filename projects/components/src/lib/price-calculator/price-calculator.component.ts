import { SteppertController } from '../core/stepper-controller';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Use } from 'ng-svg/core';
import { SymbolService } from '../services/symbol.service';
import { PathData } from 'ng-svg/geom';
import { SymbolListComponent } from '../symbol-list/symbol-list.component';

import { MatSort, MatTableDataSource } from '@angular/material';
import { path2poly } from 'projects/ng-svg/geom/src/path2poly';

interface SymbolItem {
  use: Use
  holes: number
  length: number
  area: number
}
@Component({
  selector: 'price-calculator',
  templateUrl: './price-calculator.component.html',
  styleUrls: ['./price-calculator.component.css']
})
export class PriceCalculatorComponent extends SteppertController implements AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['use', 'length', 'holes', 'area']

  constructor(private service: SymbolService) {
    super()
  }

  @ViewChild(SymbolListComponent)
  symList: SymbolListComponent
  ngOnInit() {
    super.ngOnInit()
  }
  ngAfterViewInit() {
    const l = this.symList
    setTimeout(() => {
      l.selectedItems = l.symbols.slice(0, 9)
      l.validateSelection()
      this.selectionCtrl.updateValueAndValidity()
      setTimeout(() => {
        this.stepperIndex = 1
        this.stepper.selectedIndex = 1
      }, 500)
    }, 500)
  }
  dataSource: MatTableDataSource<SymbolItem>;
  selectionChanged(items: Use[]) {

    super.selectionChanged(items)
    const service = this.service
    let pathData: PathData = new PathData()
    let dataSource = items.map(use => {
      const sym = service.getSymbolByRef(use.href)
      const coll = service.getSymbolPathCollection(sym.id)
      if (!coll || !coll.length)
      throw new Error("Missing path collection")
      const p = sym.paths[0]
      pathData.data = p.d
      const pe = coll[0]
      const polygons = path2poly.getPolygons(pathData.commands)
      return {
        area: Math.round(path2poly.getPolygonsArea(polygons)),
        use: use,
        holes: pathData.commands.length - 1,
        length: Math.round(pe.getTotalLength())
      }
    })
    this.dataSource = new MatTableDataSource(dataSource);
    this.dataSource.sort = this.sort;
  }
  
}

