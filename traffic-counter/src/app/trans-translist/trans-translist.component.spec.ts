import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransTranslistComponent } from './trans-translist.component';

describe('TransTranslistComponent', () => {
  let component: TransTranslistComponent;
  let fixture: ComponentFixture<TransTranslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransTranslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransTranslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
