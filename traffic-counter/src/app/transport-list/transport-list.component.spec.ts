import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportListComponent } from './transport-list.component';

describe('TransportListComponent', () => {
  let component: TransportListComponent;
  let fixture: ComponentFixture<TransportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
