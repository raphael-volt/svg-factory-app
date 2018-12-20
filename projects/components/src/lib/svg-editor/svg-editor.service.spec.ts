import { TestBed } from '@angular/core/testing';

import { SvgEditorService } from './svg-editor.service';

describe('SvgEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SvgEditorService = TestBed.get(SvgEditorService);
    expect(service).toBeTruthy();
  });
});
