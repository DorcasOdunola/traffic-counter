import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittransportDialogComponent } from './edittransport-dialog.component';

describe('EdittransportDialogComponent', () => {
  let component: EdittransportDialogComponent;
  let fixture: ComponentFixture<EdittransportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdittransportDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittransportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
