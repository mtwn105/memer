import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustommemeComponent } from './custommeme.component';

describe('CustommemeComponent', () => {
  let component: CustommemeComponent;
  let fixture: ComponentFixture<CustommemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustommemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustommemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
