import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofileDialogComponent } from './editprofile-dialog.component';

describe('EditprofileDialogComponent', () => {
  let component: EditprofileDialogComponent;
  let fixture: ComponentFixture<EditprofileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditprofileDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprofileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
