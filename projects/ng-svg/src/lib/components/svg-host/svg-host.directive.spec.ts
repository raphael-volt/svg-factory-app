import { TestBed } from '@angular/core/testing';

import { SvgHostDirective } from './svg-host.directive';
import { FactoryService } from "../factory.service";
describe('SvgHostDirective', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FactoryService,
      SvgHostDirective
    ]
  }));
  it('should create an instance', () => {
    const directive = TestBed.get(SvgHostDirective)
    expect(directive).toBeTruthy();
  });
});
