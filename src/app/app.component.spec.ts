import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ComponentsModule } from 'components';
import { RoutingModule, appRoutes } from './core/routing.module';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[
        ComponentsModule,
        RoutingModule
      ],
      providers:[
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy()
    
    expect(app.title).toEqual('symbols-app')
  });

  it(`should have navigation links`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges()
    const app: Element = fixture.elementRef.nativeElement;
    expect(app.getElementsByTagName('a').length).toEqual(appRoutes.length)
  })
});
