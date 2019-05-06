import { SteppertController } from '../core/stepper-controller';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Use, ISymbol } from 'ng-svg/core';
import { SymbolService } from '../services/symbol.service';
import { SymbolListComponent } from '../symbol-list/symbol-list.component';

import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { SymbolAreaService, SymbolDetail } from '../services/symbol-area.service';
import { BusyIndicatorComponent } from '../busy-indicator/busy-indicator.component';

interface SymbolItem {
  use: Use
  detail: SymbolDetail
}
@Component({
  selector: 'price-calculator',
  templateUrl: './price-calculator.component.html',
  styleUrls: ['./price-calculator.component.css']
})
export class PriceCalculatorComponent extends SteppertController implements AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['use', 'length', 'holes', 'areaTotal', 'areaOuter', 'areaInner', 'areaRatio']

  @ViewChild(SymbolListComponent)
  symList: SymbolListComponent

  dataSource: MatTableDataSource<SymbolItem> = new MatTableDataSource()

  constructor(
    private service: SymbolService,
    private areaService: SymbolAreaService,
    private dialog: MatDialog) {
    super()
  }

  ngOnInit() {
    super.ngOnInit()
  }
  ngAfterViewInit() {
    this.dataSource.sortingDataAccessor = (item: SymbolItem, property) => {
      switch(property) {
        case 'length': return item.detail.totalLength;
        case 'holes': return item.detail.holes;
        case 'areaTotal': return item.detail.area.total;
        case 'areaOuter': return item.detail.area.outer;
        case 'areaInner': return item.detail.area.inner;
        case 'areaRatio': return item.detail.area.ratio;
        
        default: return item[property];
      }
    }
    this.dataSource.sort = this.sort
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
  selectionChanged(items: Use[]) {

    super.selectionChanged(items)
    const service = this.service

    const area = this.areaService

    const data: SymbolItem[] = []
    let symbols: ISymbol[] = []
    let sym: ISymbol
    const map: { [i: string]: Use } = {}
    for (const u of items) {
      sym = service.getSymbolByRef(u.href)
      const d = area.getDetail(sym)
      if (d) {
        data.push({ use: u, detail: d })
        continue
      }
      map[sym.id] = u
      symbols.push(sym)
    }
    if (symbols.length) {
      const busy = BusyIndicatorComponent.open(this.dialog, "bar", symbols.length)
      const sub = area.createAreas(symbols).subscribe(detail => {
        busy.progress++
        data.push({
          use: map[detail.symbolId],
          detail: detail
        })
      },
        error => { },
        () => {
          this.setDataSource(data)
          busy.close()
        })
    }
    else
      this.setDataSource(data)
  }

  private setDataSource(data: SymbolItem[]) {
    this.dataSource.data = data 
  }
}

