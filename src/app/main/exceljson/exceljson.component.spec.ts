import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceljsonComponent } from './exceljson.component';

describe('ExceljsonComponent', () => {
  let component: ExceljsonComponent;
  let fixture: ComponentFixture<ExceljsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExceljsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceljsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
