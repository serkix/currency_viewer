import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryValueComponent } from './history-value.component';

describe('HistoryValueComponent', () => {
  let component: HistoryValueComponent;
  let fixture: ComponentFixture<HistoryValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
