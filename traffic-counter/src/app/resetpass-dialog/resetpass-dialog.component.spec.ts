import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpassDialogComponent } from './resetpass-dialog.component';

describe('ResetpassDialogComponent', () => {
  let component: ResetpassDialogComponent;
  let fixture: ComponentFixture<ResetpassDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetpassDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
