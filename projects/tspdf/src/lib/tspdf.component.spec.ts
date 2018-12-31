import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TspdfComponent } from './tspdf.component';

describe('TspdfComponent', () => {
  let component: TspdfComponent;
  let fixture: ComponentFixture<TspdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TspdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TspdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
