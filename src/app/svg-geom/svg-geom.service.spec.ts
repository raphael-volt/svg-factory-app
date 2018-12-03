import { TestBed, async, inject } from '@angular/core/testing';

import { SvgGeomService } from './svg-geom.service';

describe('SvgGeomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SvgGeomService = TestBed.get(SvgGeomService);
    expect(service).toBeTruthy();
  });
  it('should load a svg file', async(()=>{
    const service: SvgGeomService = TestBed.get(SvgGeomService)
    
  }))
});
