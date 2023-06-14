import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewparkComponent } from './newpark.component';

describe('NewparkComponent', () => {
  let component: NewparkComponent;
  let fixture: ComponentFixture<NewparkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewparkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewparkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
