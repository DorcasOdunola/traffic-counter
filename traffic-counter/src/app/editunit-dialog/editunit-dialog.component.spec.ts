import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditunitDialogComponent } from './editunit-dialog.component';

describe('EditunitDialogComponent', () => {
  let component: EditunitDialogComponent;
  let fixture: ComponentFixture<EditunitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditunitDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditunitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
