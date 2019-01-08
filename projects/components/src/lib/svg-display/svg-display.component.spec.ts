import { TestBed, inject } from '@angular/core/testing';
import { SvgDisplayModule } from "./svg-display.module";
import { SvgDisplayService } from './svg-display.service';

describe('SvgDisplayModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        SvgDisplayService
      ],
      imports: [
        SvgDisplayModule
      ]
    })
  })
  it('should inject service', inject([SvgDisplayService], (service: SvgDisplayService) => {
    expect(service).toBeTruthy()
  }));
});
