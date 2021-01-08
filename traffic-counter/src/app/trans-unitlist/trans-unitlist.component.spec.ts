import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransUnitlistComponent } from './trans-unitlist.component';

describe('TransUnitlistComponent', () => {
  let component: TransUnitlistComponent;
  let fixture: ComponentFixture<TransUnitlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransUnitlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransUnitlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
