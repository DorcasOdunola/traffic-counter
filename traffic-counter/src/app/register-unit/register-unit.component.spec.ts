import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUnitComponent } from './register-unit.component';

describe('RegisterUnitComponent', () => {
  let component: RegisterUnitComponent;
  let fixture: ComponentFixture<RegisterUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
