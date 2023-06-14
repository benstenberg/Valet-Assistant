import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkInfoComponent } from './park-info.component';

describe('ParkInfoComponent', () => {
  let component: ParkInfoComponent;
  let fixture: ComponentFixture<ParkInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
